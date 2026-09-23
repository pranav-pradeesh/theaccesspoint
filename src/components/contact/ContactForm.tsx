"use client";

import { useEffect, useRef, useState } from "react";
import { submitToWeb3Forms } from "@/lib/forms/web3forms";
import { siteConfig } from "@/lib/site";
import { budgets, leadSchema, projectTypes, timelines, type LeadInput } from "@/lib/validation/lead";

type Fields = { [K in keyof LeadInput]-?: string };
type Errors = Partial<Record<keyof LeadInput | "form", string>>;

const EMPTY: Fields = { projectType: "", description: "", budget: "", timeline: "", name: "", email: "", phone: "", company: "" };
const ORDER: (keyof LeadInput)[] = ["name", "email", "phone", "company", "projectType", "budget", "timeline", "description"];

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [botcheck, setBotcheck] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(fields);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof LeadInput] ??= issue.message;
      setErrors(next);
      const first = ORDER.find((k) => next[k]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    const d = parsed.data;
    const result = await submitToWeb3Forms({
      subject: `Project enquiry: ${d.projectType} from ${d.name}`,
      fromName: "The Access Point website",
      replyTo: d.email,
      botcheck,
      fields: {
        "Enquiry type": "Project",
        Name: d.name,
        Email: d.email,
        Phone: d.phone || "Not given",
        Company: d.company || "Not given",
        "Project type": d.projectType,
        Budget: d.budget,
        Timeline: d.timeline,
        Description: d.description,
      },
    });
    if (!result.ok) {
      setErrors({ form: result.error });
      setStatus("idle");
      return;
    }
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="card p-8" role="status">
        <h2 ref={doneRef} tabIndex={-1} className="t-h2 outline-none">
          Thank you, {fields.name.trim().split(" ")[0]}.
        </h2>
        <p className="mt-3 text-fg-2">
          We&apos;ve received your enquiry and will reply to <strong className="text-fg">{fields.email.trim()}</strong>.
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-6"
          onClick={() => {
            setFields(EMPTY);
            setStatus("idle");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <h2 className="t-h3">Project enquiry</h2>
      <p className="mt-1 text-sm text-fg-2">Fields marked * are required.</p>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave empty
          <input tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} name="botcheck" />
        </label>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Input id="name" label="Name" required autoComplete="name" value={fields.name} onChange={(v) => set("name", v)} error={errors.name} />
        <Input
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={fields.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
        />
        <Input id="phone" label="Phone" type="tel" autoComplete="tel" value={fields.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
        <Input
          id="company"
          label="Company"
          autoComplete="organization"
          value={fields.company}
          onChange={(v) => set("company", v)}
          error={errors.company}
        />
        <Select
          id="projectType"
          label="Project type"
          options={projectTypes}
          value={fields.projectType}
          onChange={(v) => set("projectType", v)}
          error={errors.projectType}
        />
        <Select id="budget" label="Budget" options={budgets} value={fields.budget} onChange={(v) => set("budget", v)} error={errors.budget} />
        <Select
          id="timeline"
          label="Timeline"
          options={timelines}
          value={fields.timeline}
          onChange={(v) => set("timeline", v)}
          error={errors.timeline}
        />
        <div className="sm:col-span-2">
          <Label htmlFor="contact-description" required>
            Project details
          </Label>
          <textarea
            id="contact-description"
            rows={6}
            value={fields.description}
            onChange={(e) => set("description", e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "contact-description-error" : undefined}
            placeholder="What do you need, who is it for, and do you have an existing website or system?"
            className="field resize-y"
          />
          <FieldError id="contact-description-error" message={errors.description} />
        </div>
      </div>

      {errors.form && (
        <div role="alert" className="mt-6 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm">
          {errors.form} You can also email{" "}
          <a className="underline underline-offset-2" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>{" "}
          or call{" "}
          <a className="underline underline-offset-2" href={siteConfig.phone.href}>
            {siteConfig.phone.display}
          </a>
          .
        </div>
      )}

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
      {children}
      {required && <span className="text-accent"> *</span>}
    </label>
  );
}

function Input({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const fid = `contact-${id}`;
  return (
    <div>
      <Label htmlFor={fid} required={required}>
        {label}
      </Label>
      <input
        id={fid}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${fid}-error` : undefined}
        className="field"
      />
      <FieldError id={`${fid}-error`} message={error} />
    </div>
  );
}

function Select({
  id,
  label,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const fid = `contact-${id}`;
  return (
    <div>
      <Label htmlFor={fid} required>
        {label}
      </Label>
      <select
        id={fid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${fid}-error` : undefined}
        className="field"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldError id={`${fid}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}
