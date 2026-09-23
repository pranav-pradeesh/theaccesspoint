import { NextResponse } from "next/server";
import { LeadStorageNotConfigured, storeLead } from "@/lib/leads/store";
import { leadSchema } from "@/lib/validation/lead";

// Best-effort, per-instance throttle. Put a platform rate limit (e.g. Vercel Firewall) in front for real protection.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot + minimum fill time: bots get a fake success so they don't adapt.
  const startedAt = Number(raw.startedAt);
  if (raw.website || (Number.isFinite(startedAt) && Date.now() - startedAt < 3000)) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  try {
    await storeLead(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads] store failed", error);
    const notConfigured = error instanceof LeadStorageNotConfigured;
    return NextResponse.json(
      {
        ok: false,
        error: notConfigured
          ? "Online briefs are temporarily unavailable. Please email us instead."
          : "Something went wrong sending your brief. Please try again or email us.",
      },
      { status: notConfigured ? 503 : 500 },
    );
  }
}
