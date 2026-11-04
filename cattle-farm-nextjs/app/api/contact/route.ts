import { NextResponse, type NextRequest } from "next/server";
import { deliverInquiry } from "@/lib/deliver";
import { rateLimit } from "@/lib/rate-limit";
import { validateInquiry } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
/** Real people take longer than this to fill in the form. */
const MIN_FILL_MS = 2500;

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function json(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(req: NextRequest) {
  // Only accept JSON posted from our own pages.
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Unsupported request." }, 415);
  }
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {}
    if (originHost !== host) {
      return json({ ok: false, error: "Unsupported request." }, 403);
    }
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Your message is too long. Shorten it and try again." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "We couldn't read that request. Refresh the page and try again." }, 400);
  }

  // Spam traps: a hidden field people never fill in, and a minimum fill time.
  // Bots get a normal-looking success so they don't learn to adapt.
  const honeypot = typeof body.company === "string" && body.company.trim() !== "";
  const startedAt = Number(body.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    return json({ ok: true });
  }

  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.allowed) {
    return json(
      { ok: false, error: "You've sent several inquiries in a short time. Wait a few minutes and try again, or call us." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const result = validateInquiry(body);
  if (!result.ok) {
    return json({ ok: false, error: "Some details need fixing.", fieldErrors: result.errors }, 422);
  }

  const delivery = await deliverInquiry(result.data, { ip });
  if (!delivery.ok) {
    return json(
      {
        ok: false,
        error:
          "Your inquiry couldn't be sent right now. Please try again later, or call or email us using the details on this page.",
      },
      delivery.reason === "not-configured" ? 503 : 502,
    );
  }

  return json({ ok: true });
}

export function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
}
