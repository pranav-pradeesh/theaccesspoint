import "server-only";
import type { LeadInput } from "@/lib/validation/lead";

export type Lead = LeadInput & { createdAt: string };

export class LeadStorageNotConfigured extends Error {}

/**
 * Persists a lead to every configured sink.
 * - Supabase (PostgREST) when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
 * - A JSON webhook when LEAD_WEBHOOK_URL is set (Slack workflow, Zapier, CRM...).
 * In production at least one sink must succeed, otherwise the lead would be lost silently.
 */
export async function storeLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = { ...input, createdAt: new Date().toISOString() };
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, LEAD_WEBHOOK_URL } = process.env;
  const tasks: Promise<void>[] = [];

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    tasks.push(insertSupabase(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, lead));
  }
  if (LEAD_WEBHOOK_URL) {
    tasks.push(postWebhook(LEAD_WEBHOOK_URL, lead));
  }

  if (tasks.length === 0) {
    if (process.env.NODE_ENV === "production") {
      throw new LeadStorageNotConfigured("No lead storage configured.");
    }
    console.info("[leads] No storage configured — development lead:", lead);
    return lead;
  }

  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((f) => console.error("[leads] sink failed:", f.reason));
  if (failures.length === results.length) throw new Error("All lead sinks failed.");
  return lead;
}

async function insertSupabase(url: string, key: string, lead: Lead) {
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      company: lead.company || null,
      project_type: lead.projectType,
      budget: lead.budget,
      timeline: lead.timeline,
      description: lead.description,
      created_at: lead.createdAt,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
}

async function postWebhook(url: string, lead: Lead) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "project_brief", lead }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
}
