import "server-only";
import { farm } from "./content";
import type { Inquiry } from "./validation";

export type DeliveryResult = { ok: true; method: string } | { ok: false; reason: "not-configured" | "failed" };

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function asText(i: Inquiry) {
  return [
    `New inquiry from the ${farm.name} website`,
    "",
    `Name: ${i.name}`,
    `Email: ${i.email}`,
    `Phone: ${i.phone || "not given"}`,
    `Interested in: ${i.subject}`,
    "",
    i.message,
  ].join("\n");
}

function asHtml(i: Inquiry) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#55554c">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`;
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#2b2b27">
<p>New inquiry from the ${escapeHtml(farm.name)} website</p>
<table>${row("Name", i.name)}${row("Email", i.email)}${row("Phone", i.phone || "not given")}${row("Interested in", i.subject)}</table>
<p style="white-space:pre-wrap;margin-top:16px">${escapeHtml(i.message)}</p>
</div>`;
}

async function withTimeout(url: string, init: RequestInit, ms = 10_000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

/** Sends the inquiry using whichever method is configured in the environment. */
export async function deliverInquiry(inquiry: Inquiry, meta: { ip: string }): Promise<DeliveryResult> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL, CONTACT_WEBHOOK_SECRET } =
    process.env;

  try {
    if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
      const res = await withTimeout("https://api.resend.com/emails", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
         "Content-Type": "application/json",
},
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: inquiry.email,
          subject: `Website inquiry: ${inquiry.subject} (${inquiry.name})`,
          text: asText(inquiry),
          html: asHtml(inquiry),
        }),
      });
      if (!res.ok) {
        console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
        return { ok: false, reason: "failed" };
      }
      return { ok: true, method: "resend" };
    }

    if (CONTACT_WEBHOOK_URL) {
      const res = await withTimeout(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(CONTACT_WEBHOOK_SECRET && { "X-Webhook-Secret": CONTACT_WEBHOOK_SECRET }),
        },
        body: JSON.stringify({ ...inquiry, receivedAt: new Date().toISOString(), ip: meta.ip }),
      });
      if (!res.ok) {
        console.error("[contact] Webhook error", res.status);
        return { ok: false, reason: "failed" };
      }
      return { ok: true, method: "webhook" };
    }
  } catch (err) {
    console.error("[contact] Delivery threw", err);
    return { ok: false, reason: "failed" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] No delivery method configured — inquiry logged for development only:\n" + asText(inquiry));
    return { ok: true, method: "dev-log" };
  }

  console.error("[contact] No delivery method configured. Set RESEND_* or CONTACT_WEBHOOK_URL.");
  return { ok: false, reason: "not-configured" };
}
