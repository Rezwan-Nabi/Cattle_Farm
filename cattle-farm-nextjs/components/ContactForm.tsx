"use client";

import { useEffect, useId, useRef, useState } from "react";
import { breeds, services } from "@/lib/content";
import { INQUIRY_EVENT } from "@/lib/inquiry";
import { INQUIRY_LIMITS, validateInquiry, type InquiryErrors, type InquiryField } from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_ORDER: InquiryField[] = ["name", "email", "phone", "subject", "message"];
const OTHER = "Something else";

const subjectOptions = [
  ...breeds.map((b) => `${b.name} cattle`),
  ...services.map((s) => s.inquirySubject),
  OTHER,
].filter((v, i, all) => all.indexOf(v) === i);

const empty = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const sending = useRef(false);

  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
    const onInquiry = (e: Event) => {
      const subject = (e as CustomEvent<string>).detail;
      if (subjectOptions.includes(subject)) {
        setValues((v) => ({ ...v, subject }));
        setErrors((er) => ({ ...er, subject: undefined }));
        setStatus((s) => (s === "sent" ? "idle" : s));
      }
    };
    window.addEventListener(INQUIRY_EVENT, onInquiry);
    return () => window.removeEventListener(INQUIRY_EVENT, onInquiry);
  }, []);

  const update = (field: InquiryField) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const focusFirstError = (errs: InquiryErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) document.getElementById(id(first))?.focus();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return; // guard against double submits

    const result = validateInquiry(values);
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    const honeypot = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";

    sending.current = true;
    setStatus("sending");
    setServerError("");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, company: honeypot, startedAt: startedAt.current }),
        signal: controller.signal,
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: InquiryErrors };

      if (res.ok && body.ok) {
        setStatus("sent");
        setValues(empty);
        setErrors({});
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (body.fieldErrors) {
        setErrors(body.fieldErrors);
        focusFirstError(body.fieldErrors);
      }
      setServerError(body.error || "Your inquiry couldn't be sent. Try again, or call or email us instead.");
      setStatus("error");
    } catch {
      setServerError(
        controller.signal.aborted
          ? "The connection timed out before your inquiry was sent. Check your connection and try again."
          : "Your inquiry couldn't be sent. Check your connection and try again, or call or email us instead.",
      );
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-pasture-900 p-8 text-parchment outline-none md:p-10"
      >
        <h3 className="font-display text-3xl">Inquiry sent</h3>
        <p className="mt-3 max-w-md text-parchment/85">
          Thanks for getting in touch. We&apos;ll reply by email, usually within one working day.
        </p>
        <button type="button" className="btn btn-hay mt-8" onClick={() => setStatus("idle")}>
          Send another inquiry
        </button>
      </div>
    );
  }

  const describedBy = (f: InquiryField, hint?: boolean) =>
    [hint && `${id(f)}-hint`, errors[f] && `${id(f)}-error`].filter(Boolean).join(" ") || undefined;

  const fieldError = (field: InquiryField) =>
    errors[field] ? (
      <p id={`${id(field)}-error`} className="mt-1.5 text-[0.95rem] font-medium text-danger">
        {errors[field]}
      </p>
    ) : null;

  const label = "mb-1.5 block font-semibold text-charcoal";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
      className="rounded-2xl bg-parchment p-6 ring-1 ring-hay-500/30 md:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={label}>
            Your name
          </label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            className="field"
            value={values.name}
            onChange={update("name")}
            maxLength={INQUIRY_LIMITS.name.max}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            required
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor={id("email")} className={label}>
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="field"
            value={values.email}
            onChange={update("email")}
            maxLength={INQUIRY_LIMITS.email.max}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            required
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone <span className="font-normal text-charcoal-soft">(optional)</span>
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="field"
            value={values.phone}
            onChange={update("phone")}
            maxLength={INQUIRY_LIMITS.phone.max}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone", true)}
          />
          <p id={`${id("phone")}-hint`} className="mt-1.5 text-[0.9rem] text-charcoal-soft">
            Add it if you&apos;d like us to call or WhatsApp you.
          </p>
          {fieldError("phone")}
        </div>

        <div>
          <label htmlFor={id("subject")} className={label}>
            Interested in
          </label>
          <select
            id={id("subject")}
            name="subject"
            className="field field-select"
            value={values.subject}
            onChange={update("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={describedBy("subject")}
            required
          >
            <option value="" disabled>
              Choose an option
            </option>
            {subjectOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {fieldError("subject")}
        </div>

        <div className="md:col-span-2">
          <label htmlFor={id("message")} className={label}>
            Message
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            className="field min-h-36 resize-y"
            value={values.message}
            onChange={update("message")}
            maxLength={INQUIRY_LIMITS.message.max}
            placeholder="How many animals, what for, and when you need them"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            required
          />
          {fieldError("message")}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div aria-live="assertive" className="mt-6 empty:hidden">
        {status === "error" && serverError && (
          <p role="alert" className="rounded-lg border-l-4 border-danger bg-danger/8 px-4 py-3 font-medium text-danger">
            {serverError}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.95rem] text-charcoal-soft">We only use your details to reply to this inquiry.</p>
        <button type="submit" className="btn btn-primary min-w-48 disabled:opacity-70" disabled={status === "sending"}>
          {status === "sending" ? "Sending inquiry…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
