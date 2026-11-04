import Image from "next/image";
import { breeds } from "@/lib/content";
import type { Breed } from "@/lib/types";
import EarTag from "./EarTag";
import InquiryLink from "./InquiryLink";

function BreedCard({ breed }: { breed: Breed }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-parchment ring-1 ring-hay-500/25">
      <div className="relative aspect-[4/3] bg-hay-200">
        <Image
          src={breed.image.src}
          alt={breed.image.alt}
          fill
          sizes="(min-width: 1280px) 18rem, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
        <EarTag
          code={breed.tag}
          className="absolute left-5 top-0 h-16 w-auto -translate-y-1 drop-shadow-[0_3px_4px_rgb(20_39_28/0.35)]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl text-pasture-900">{breed.name}</h3>
        <p className="mt-2 text-charcoal-soft">{breed.summary}</p>

        {breed.traits.length > 0 && (
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.95rem]">
            {breed.traits.map((t) => (
              <div key={t.label} className="contents">
                <dt className="text-charcoal-soft">{t.label}</dt>
                <dd className="font-medium text-charcoal">{t.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-6">
          <InquiryLink subject={`${breed.name} cattle`} className="btn btn-outline w-full">
            Ask about this breed
            <span className="sr-only">: {breed.name}</span>
          </InquiryLink>
        </div>
      </div>
    </article>
  );
}

export default function Livestock() {
  if (breeds.length === 0) return null;

  return (
    <section id="livestock" aria-labelledby="livestock-heading" className="bg-hay-200/60 py-20 md:py-28">
      <div className="container-farm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 id="livestock-heading" className="text-4xl text-pasture-900 md:text-5xl">
              The breeds we raise
            </h2>
            <p className="mt-4 text-lg text-charcoal-soft">
              Availability changes through the year. Ask about a breed and we&apos;ll tell you which animals are ready,
              with their age, weight and price.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary self-start md:self-auto">
            Ask what&apos;s available
          </a>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {breeds.map((breed) => (
            <li key={breed.id}>
              <BreedCard breed={breed} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
