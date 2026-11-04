import Link from "next/link";
import { farm, navItems } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, addressLines } = farm.contact;

  return (
    <footer className="bg-pasture-950 text-parchment/80">
      <div className="container-farm grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm">{farm.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-lg text-parchment">Explore</h2>
          <ul className="mt-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-parchment">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg text-parchment">Get in touch</h2>
          <ul className="mt-3 space-y-1">
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="inline-flex min-h-10 items-center hover:text-parchment">
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="inline-flex min-h-10 items-center hover:text-parchment">
                  {email}
                </a>
              </li>
            )}
            {addressLines.length > 0 && <li className="pt-2">{addressLines.join(", ")}</li>}
          </ul>

          {farm.social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Social media">
              {farm.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center font-semibold text-hay-300 hover:text-parchment"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-farm py-6 text-[0.9rem] text-parchment/60">
          © {year} {farm.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
