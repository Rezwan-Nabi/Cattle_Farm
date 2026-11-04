import { services } from "@/lib/content";
import InquiryLink from "./InquiryLink";

export default function Services() {
  if (services.length === 0) return null;

  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 md:py-28">
      <div className="container-farm grid gap-12 lg:grid-cols-[4fr_8fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="services-heading" className="text-4xl text-pasture-900 md:text-5xl">
            What we offer
          </h2>
          <p className="mt-4 max-w-md text-lg text-charcoal-soft">
            From a single animal to a regular supply, tell us what you need and we&apos;ll plan it with you.
          </p>
        </div>

        <ul className="border-t border-pasture-900/20">
          {services.map((s) => (
            <li
              key={s.id}
              className="grid gap-3 border-b border-pasture-900/20 py-8 md:grid-cols-[1fr_auto] md:items-start md:gap-10"
            >
              <div>
                <h3 className="text-2xl text-pasture-900 md:text-[1.75rem]">{s.title}</h3>
                <p className="mt-2 max-w-[56ch] text-charcoal-soft">{s.description}</p>
              </div>
              <InquiryLink
                subject={s.inquirySubject}
                className="inline-flex min-h-11 items-center self-start font-semibold text-pasture-800 underline decoration-hay-500 decoration-2 underline-offset-[6px] transition-colors hover:text-pasture-900 hover:decoration-pasture-900"
              >
                Ask about this
                <span className="sr-only">: {s.title}</span>
              </InquiryLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
