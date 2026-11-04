/**
 * Inquiry validation shared by the browser (instant feedback) and the
 * API route (the check that actually counts). Keep it dependency-free.
 */

export const INQUIRY_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 25 },
  subject: { min: 2, max: 120 },
  message: { min: 10, max: 3000 },
} as const;

export type InquiryField = "name" | "email" | "phone" | "subject" | "message";

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type InquiryErrors = Partial<Record<InquiryField, string>>;

export type ValidationResult = { ok: true; data: Inquiry } | { ok: false; errors: InquiryErrors };

// Pragmatic check: one @, no spaces, a dot in the domain part.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits plus common phone punctuation, at least 6 digits in total.
const PHONE_CHARS_RE = /^[+()\-.\s\d]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateInquiry(input: unknown): ValidationResult {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const data: Inquiry = {
    name: str(raw.name),
    email: str(raw.email).toLowerCase(),
    phone: str(raw.phone),
    subject: str(raw.subject),
    message: str(raw.message),
  };
  const errors: InquiryErrors = {};
  const L = INQUIRY_LIMITS;

  if (!data.name) errors.name = "Enter your name.";
  else if (data.name.length < L.name.min) errors.name = "Enter your full name.";
  else if (data.name.length > L.name.max) errors.name = `Use ${L.name.max} characters or fewer.`;

  if (!data.email) errors.email = "Enter your email address so we can reply.";
  else if (data.email.length > L.email.max || !EMAIL_RE.test(data.email))
    errors.email = "Enter an email address like name@example.com.";

  if (data.phone) {
    const digits = data.phone.replace(/\D/g, "");
    if (data.phone.length > L.phone.max || !PHONE_CHARS_RE.test(data.phone) || digits.length < 6)
      errors.phone = "Enter a phone number using digits, spaces and +, or leave it blank.";
  }

  if (!data.subject) errors.subject = "Choose what you'd like to ask about.";
  else if (data.subject.length > L.subject.max) errors.subject = "Choose an option from the list.";

  if (!data.message) errors.message = "Write a short message about what you need.";
  else if (data.message.length < L.message.min) errors.message = `Add a little more detail (at least ${L.message.min} characters).`;
  else if (data.message.length > L.message.max) errors.message = `Keep your message under ${L.message.max} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
