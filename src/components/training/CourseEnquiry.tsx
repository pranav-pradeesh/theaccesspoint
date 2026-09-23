"use client";

import { useEffect, useRef, useState } from "react";
import { submitToWeb3Forms } from "@/lib/forms/web3forms";
import type { Course } from "@/lib/cms/types";
import { siteConfig } from "@/lib/site";

type Fields = { course: string; name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields | "form", string>>;

const EMPTY: Fields = { course: "", name: "", email: "", phone: "", message: "" };
const HASH_PREFIX = "#enquire-";

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.course) e.course = "Choose a course.";
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  const digits = f.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) e.phone = "Please enter a valid phone number.";
  if (f.message.length > 2000) e.message = "Please keep your message under 2,000 characters.";
  return e;
}

/**
 * Course admission enquiry. `defaultCourse` preselects a course (course pages); on the Training page,
 * "Enquire" links preselect it via #enquire-<slug>.
 */
export function CourseEnquiry({ courses, defaultCourse = "" }: { courses: Course[]; defaultCourse?: string }) {
  const initial = { ...EMPTY, course: defaultCourse };
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [botcheck, setBotcheck] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const pick = () => {
      if (!window.location.hash.startsWith(HASH_PREFIX)) return;
      const slug = window.location.hash.slice(HASH_PREFIX.length);
      const course = courses.find((c) => c.slug === slug);
      if (!course) return;
      setFields((f) => ({ ...f, course: course.title }));
      setStatus("idle");
      sectionRef.current?.scrollIntoView({ block: "start" });
      document.getElementById("enquiry-name")?.focus({ preventScroll: true });
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [courses]);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitToWeb3Forms({
      subject: `Course enquiry: ${fields.course} from ${fields.name.trim()}`,
      fromName: "The Access Point website",
      replyTo: fields.email.trim(),
      botcheck,
      fields: {
        "Enquiry type": "Course admission",
        Course: fields.course,
        Name: fields.name.trim(),
        Email: fields.email.trim(),
        Phone: fields.phone.trim(),
        Message: fields.message.trim() || "Not given",
      },
    });
    if (!result.ok) {
      setErrors({ form: result.error });
      setStatus("idle");
      return;
    }
    setStatus("sent");
  };

  return (
    <section ref={sectionRef} id="enquire" aria-labelledby="enquire-heading" className="scroll-mt-28">
      <div className="card p-6 sm:p-8">
        {status === "sent" ? (
          <div role="status">
            <h2 ref={doneRef} tabIndex={-1} id="enquire-heading" className="t-h2 outline-none">
              Thank you, {fields.name.trim().split(" ")[0]}.
            </h2>
            <p className="t-lead mt-4 text-fg-2">
              We&apos;ve received your enquiry about <strong className="text-fg">{fields.course}</strong> and will contact you
              with batch timings, duration and fees.
            </p>
            <button
              type="button"
              className="btn btn-secondary mt-8"
              onClick={() => {
                setFields(initial);
                setStatus("idle");
              }}
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="enquire-heading" className="t-h2">
              Enquire about a course
            </h2>
            <p className="mt-3 text-fg-2">
              Tell us which course you&apos;re interested in and we&apos;ll contact you with batch timings, duration and
              fees.
            </p>

            {/* Honeypot: hidden from people and assistive technology */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Leave empty
                <input tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} name="botcheck" />
              </label>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="enquiry-course" required>
                  Course
                </Label>
                <select
                  id="enquiry-course"
                  value={fields.course}
                  onChange={(e) => set("course", e.target.value)}
                  aria-invalid={!!errors.course}
                  aria-describedby={errors.course ? "enquiry-course-error" : undefined}
                  className="field"
                >
                  <option value="">Select a course…</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <FieldError id="enquiry-course-error" message={errors.course} />
              </div>
              <Input id="enquiry-name" label="Name" autoComplete="name" required value={fields.name} onChange={(v) => set("name", v)} error={errors.name} />
              <Input
                id="enquiry-phone"
                label="Phone"
                type="tel"
                autoComplete="tel"
                required
                value={fields.phone}
                onChange={(v) => set("phone", v)}
                error={errors.phone}
              />
              <div className="sm:col-span-2">
                <Input
                  id="enquiry-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                  value={fields.email}
                  onChange={(v) => set("email", v)}
                  error={errors.email}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="enquiry-message">Message</Label>
                <textarea
                  id="enquiry-message"
                  rows={4}
                  value={fields.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "enquiry-message-error" : undefined}
                  placeholder="Your background, preferred timings, or any questions."
                  className="field resize-y"
                />
                <FieldError id="enquiry-message-error" message={errors.message} />
              </div>
            </div>

            {errors.form && (
              <div role="alert" className="mt-6 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm">
                {errors.form}{" "}
                <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>{" "}
                ·{" "}
                <a className="underline underline-offset-4" href={siteConfig.phone.href}>
                  {siteConfig.phone.display}
                </a>
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-8 w-full sm:w-auto" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
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
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-danger">
      {message}
    </p>
  );
}
