import type { Metadata, Viewport } from "next";
import { Public_Sans, Zilla_Slab } from "next/font/google";
import { farm } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-zilla",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
  display: "swap",
});

const title = `${farm.name} | ${farm.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${farm.name}`,
  },
  description: farm.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: farm.name,
    title,
    description: farm.description,
    images: [{ url: "/images/cow-og.jpg", width: 1200, height: 630, alt: farm.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: farm.description,
    images: ["/images/cow-og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1e3a2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${zilla.variable} ${publicSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-tag focus:px-5 focus:py-3 focus:font-semibold focus:text-tag-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
