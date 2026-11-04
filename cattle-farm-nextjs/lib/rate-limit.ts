import "server-only";

/**
 * Small in-memory sliding-window limiter.
 *
 * Good enough to stop a single client hammering the form on one server.
 * On serverless hosts each instance keeps its own memory, so for heavier
 * protection put a shared store (e.g. Upstash Redis) or a CAPTCHA such as
 * Cloudflare Turnstile in front of the endpoint.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { allowed: false as const, retryAfter };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return { allowed: true as const };
}
