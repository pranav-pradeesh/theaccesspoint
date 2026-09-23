"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import { budgets, leadSchema, projectTypes, stepFields, timelines, type LeadInput } from "@/lib/validation/lead";

type Draft = { [K in keyof LeadInput]-?: string };
type Errors = Partial<Record<keyof LeadInput | "form", string>>;

const EMPTY: Draft = { projectType: "", description: "", budget: "", timeline: "", name: "", email: "", phone: "", company: "" };
const STEPS = ["Project type", "Description", "Budget", "Timeline", "Contact"] as const;

export function ProjectBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [startedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  const set = (key: keyof Draft, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  };

  const validateStep = (i: number) => {
    const fields = stepFields[i] ?? [];
    const result = leadSchema.safeParse(data);
    const next: Errors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LeadInput;
        if ((fields as readonly string[]).includes(key)) next[key] ??= issue.message;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    if (!validateStep(step)) return;
    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      // Jump back to the first step that has a problem.
      const bad = parsed.error.issues[0]?.path[0];
      const idx = stepFields.findIndex((f) => (f as readonly unknown[]).includes(bad));
      if (idx >= 0) setStep(idx);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: honeypot, startedAt }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Errors };
      if (!res.ok || !json.ok) {
        setErrors({ ...(json.fieldErrors ?? {}), form: json.error ?? "Something went wrong. Please try again." });
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setErrors({ form: "We couldn't reach the server. Check your connection and try again." });
      setStatus("idle");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) goNext();
    else void submit();
  };

  if (status === "sent") {
    return (
      <div className="card-gateway p-8 hover:translate-y-0! lg:p-12" role="status">
        <div className="hairline-glow absolute inset-x-0 top-0" aria-hidden />
        <p className="t-micro text-cyan">Brief received</p>
        <h2 ref={headingRef} tabIndex={-1} className="t-h2 mt-6 outline-none">
          Thank you, {data.name.split(" ")[0]}.
        </h2>
        <p className="t-lead mt-4 text-fg-2">
          Your project brief is with us. We&apos;ll read it properly and reply to <strong className="text-fg">{data.email}</strong>{" "}
          with next steps.
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-10"
          onClick={() => {
            setData(EMPTY);
            setStep(0);
            setStatus("idle");
          }}
        >
          Send another brief
        </button>
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={onSubmit} noValidate className="card-gateway p-6 hover:translate-y-0! sm:p-8 lg:p-12" aria-describedby="builder-progress">
      <div className="hairline-glow absolute inset-x-0 top-0" aria-hidden />

      {/* Progress */}
      <div id="builder-progress">
        <div className="flex items-center justify-between">
          <p className="t-micro text-cyan">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="t-micro text-fg-3">{STEPS[step]}</p>
        </div>
        <div className="mt-4 h-px w-full bg-line" aria-hidden>
          <div className="h-px bg-cyan transition-[width] duration-700 ease-[var(--ease-access)]" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-4 hidden gap-2 sm:flex" aria-label="Steps">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1">
              <button
                type="button"
                disabled={i > step}
                onClick={() => setStep(i)}
                aria-current={i === step ? "step" : undefined}
                className={`t-micro w-full text-left text-[10px]! transition-colors disabled:cursor-default ${i === step ? "text-fg" : i < step ? "text-fg-2 hover:text-cyan" : "text-fg-3"}`}
              >
                0{i + 1} {label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
        </label>
      </div>

      <div key={step} className="mt-10 animate-[hero-rise_0.6s_var(--ease-access)_both]">
        {step === 0 && (
          <Choice
            heading="What are you looking to build?"
            headingRef={headingRef}
            name="projectType"
            options={projectTypes}
            value={data.projectType}
            onChange={(v) => set("projectType", v)}
            error={errors.projectType}
          />
        )}

        {step === 1 && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
              <label htmlFor="description">Tell us about the project.</label>
            </h2>
            <p id="description-hint" className="mt-2 text-fg-2">
              What are you trying to achieve, who is it for, and what exists today?
            </p>
            <textarea
              id="description"
              name="description"
              rows={7}
              value={data.description}
              onChange={(e) => set("description", e.target.value)}
              aria-invalid={!!errors.description}
              aria-describedby={`description-hint${errors.description ? " description-error" : ""}`}
              className="field mt-6 resize-y"
              placeholder="e.g. We run a training institute and need a website where students can find courses and enquire…"
            />
            <div className="mt-2 flex justify-between text-sm">
              <FieldError id="description-error" message={errors.description} />
              <span className="ml-auto font-mono text-xs text-fg-3">{data.description.length} / 4000</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <Choice
            heading="What's your budget range?"
            hint="An honest range helps us recommend the right scope. It's fine not to know yet."
            headingRef={headingRef}
            name="budget"
            options={budgets}
            value={data.budget}
            onChange={(v) => set("budget", v)}
            error={errors.budget}
          />
        )}

        {step === 3 && (
          <Choice
            heading="When do you need it?"
            headingRef={headingRef}
            name="timeline"
            options={timelines}
            value={data.timeline}
            onChange={(v) => set("timeline", v)}
            error={errors.timeline}
          />
        )}

        {step === 4 && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
              How can we reach you?
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <TextField id="name" label="Name" autoComplete="name" required value={data.name} onChange={(v) => set("name", v)} error={errors.name} />
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
              />
              <TextField id="phone" label="Phone" type="tel" autoComplete="tel" value={data.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
              <TextField
                id="company"
                label="Company"
                autoComplete="organization"
                value={data.company}
                onChange={(v) => set("company", v)}
                error={errors.company}
              />
            </div>
            <p className="mt-5 text-sm text-fg-3">We only use these details to reply to your brief.</p>
          </div>
        )}
      </div>

      {errors.form && (
        <div role="alert" className="mt-8 rounded-[10px] border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 p-4 text-sm">
          {errors.form}{" "}
          <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-8">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`btn btn-secondary ${step === 0 ? "invisible" : ""}`}
          aria-hidden={step === 0}
          tabIndex={step === 0 ? -1 : undefined}
        >
          ← Back
        </button>
        {step < STEPS.length - 1 ? (
          <button type="submit" className="btn btn-primary">
            Continue <span className="arrow">→</span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Project Brief"} <span className="arrow">→</span>
          </button>
        )}
      </div>
    </form>
  );
}

function Choice({
  heading,
  hint,
  headingRef,
  name,
  options,
  value,
  onChange,
  error,
}: {
  heading: string;
  hint?: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="contents">
        <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
          {heading}
        </h2>
      </legend>
      {hint && <p className="mt-2 text-fg-2">{hint}</p>}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={`group relative flex min-h-16 cursor-pointer items-center justify-between gap-3 rounded-[12px] border px-5 py-4 font-semibold transition-all duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cyan ${
                checked ? "border-cyan bg-cyan/10 text-fg" : "border-line-strong bg-white/[0.02] text-fg-2 hover:border-white/30 hover:text-fg"
              }`}
            >
              <input type="radio" name={name} value={opt} checked={checked} onChange={() => onChange(opt)} className="sr-only" />
              {opt}
              <span
                aria-hidden
                className={`flex size-5 items-center justify-center rounded-full border transition-colors ${checked ? "border-cyan bg-cyan" : "border-white/25"}`}
              >
                {checked && <span className="size-2 rounded-full bg-obsidian" />}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${name}-error`} message={error} className="mt-3" />
    </fieldset>
  );
}

function TextField({
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
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label} {required ? <span className="text-cyan">*</span> : <span className="font-normal text-fg-3">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      <FieldError id={`${id}-error`} message={error} className="mt-2" />
    </div>
  );
}

function FieldError({ id, message, className = "" }: { id: string; message?: string; className?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={`text-sm text-[#ff8a8a] ${className}`}>
      {message}
    </p>
  );
}
