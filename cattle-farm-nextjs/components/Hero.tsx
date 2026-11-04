"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { hero } from "@/lib/content";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // One orchestrated load sequence: the photo settles, then the copy rises in order.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      };

  const [first, ...rest] = hero.headline.split(". ");
  const lines = rest.length ? [`${first}.`, rest.join(". ")] : [hero.headline];

  return (
    <section aria-labelledby="hero-heading" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-pasture-950">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      {/* Legibility scrim: darkest where the text sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_39_28/0.92)_0%,rgb(20_39_28/0.55)_45%,rgb(20_39_28/0.15)_75%,rgb(20_39_28/0.35)_100%)]"
      />

      <motion.div
        className="container-farm pb-16 pt-32 md:pb-24"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
      >
        <h1 id="hero-heading" className="max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.98] text-parchment">
          {lines.map((line) => (
            <motion.span key={line} variants={item} className="block">
              {line}
            </motion.span>
          ))}
        </h1>
        <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/85 md:text-xl">
          {hero.description}
        </motion.p>
        <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={hero.primaryCta.href} className="btn btn-hay">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="btn btn-ghost-light">
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
