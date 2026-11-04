import { contactSection, farm } from "@/lib/content";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  const { phone, whatsapp, email, addressLines, mapUrl, hours } = farm.contact;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-hay-200/60 py-20 md:py-28">
      <div className="container-farm grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 id="contact-heading" className="text-4xl text-pasture-900 md:text-5xl">
            {contactSection.heading}
          </h2>
          <p className="mt-4 max-w-md text-lg text-charcoal-soft">{contactSection.intro}</p>

          <dl className="mt-10 space-y-6">
            {phone && (
              <div>
                <dt className="font-display text-lg text-pasture-900">Call</dt>
                <dd>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex min-h-11 items-center text-lg font-semibold underline decoration-hay-500 decoration-2 underline-offset-4 hover:decoration-pasture-900"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
            )}
            {whatsapp && (
              <div>
                <dt className="font-display text-lg text-pasture-900">WhatsApp</dt>
                <dd>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-lg font-semibold underline decoration-hay-500 decoration-2 underline-offset-4 hover:decoration-pasture-900"
                  >
                    Message us on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
            {email && (
              <div>
                <dt className="font-display text-lg text-pasture-900">Email</dt>
                <dd>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex min-h-11 items-center text-lg font-semibold underline decoration-hay-500 decoration-2 underline-offset-4 hover:decoration-pasture-900"
                  >
                    {email}
                  </a>
                </dd>
              </div>
            )}
            {addressLines.length > 0 && (
              <div>
                <dt className="font-display text-lg text-pasture-900">Visit the farm</dt>
                <dd className="text-charcoal-soft">
                  <address className="not-italic">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  {hours?.map((h) => (
                    <span key={h} className="mt-1 block">
                      {h}
                    </span>
                  ))}
                  {mapUrl && (
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center font-semibold text-pasture-800 underline underline-offset-4"
                    >
                      Get directions<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="relative">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
