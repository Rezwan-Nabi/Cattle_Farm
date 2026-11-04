import Link from "next/link";
import { farm } from "@/lib/content";
import EarTag from "./EarTag";

export default function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const initial = farm.shortName.charAt(0).toUpperCase();
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 font-display text-xl font-semibold leading-none ${
        tone === "light" ? "text-parchment" : "text-pasture-900"
      }`}
    >
      <EarTag code={initial} tone="hay" className="h-9 w-auto" />
      <span>{farm.name}</span>
    </Link>
  );
}
