import Image from "next/image";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 md:py-28">
      <div className="container-farm grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-hay-200">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h2 id="about-heading" className="max-w-xl text-4xl text-pasture-900 md:text-5xl">
            {about.heading}
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg text-charcoal-soft">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <ul className="mt-10 border-t border-hay-500/40">
            {about.values.map((v) => (
              <li
                key={v.title}
                className="grid gap-1 border-b border-hay-500/40 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <h3 className="font-display text-xl text-pasture-900">{v.title}</h3>
                <p className="text-charcoal-soft">{v.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
