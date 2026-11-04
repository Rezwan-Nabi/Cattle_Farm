import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { farm } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: farm.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar solid />
      <main id="main" className="pt-18">
        <About />
      </main>
      <Footer />
    </>
  );
}
