import Image from "next/image";
import { care } from "@/lib/content";

export default function Sustainability() {
  return (
    <section id="care" aria-labelledby="care-heading" className="bg-pasture-900 py-20 text-parchment md:py-28">
      <div className="container-farm">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="care-heading" className="text-4xl md:text-5xl">
              {care.heading}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-parchment/80">{care.intro}</p>

            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {care.practices.map((p) => (
                <li key={p.title} className="border-t-2 border-hay-300/60 pt-4">
                  <h3 className="font-display text-xl text-hay-300">{p.title}</h3>
                  <p className="mt-2 text-parchment/80">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-80 overflow-hidden rounded-2xl bg-pasture-800 lg:min-h-full">
            <Image
              src={care.image.src}
              alt={care.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
