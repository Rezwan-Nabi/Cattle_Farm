import { testimonials } from "@/lib/content";

/**
 * Shows approved customer feedback only. The section is not rendered at all
 * while `testimonials` in lib/content.ts is empty (PRD FR-07).
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="py-20 md:py-28">
      <div className="container-farm">
        <h2 id="testimonials-heading" className="text-4xl text-pasture-900 md:text-5xl">
          What our buyers say
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col border-l-4 border-hay-300 pl-6">
                <blockquote className="font-display text-xl leading-snug text-pasture-900">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-5 text-charcoal-soft">
                  <span className="font-semibold text-charcoal">{t.name}</span>
                  {t.context && <span className="block text-[0.95rem]">{t.context}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
