import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Navbar solid />
      <main id="main" className="container-farm flex min-h-[70vh] flex-col items-start justify-center py-32">
        <h1 className="text-4xl text-pasture-900 md:text-5xl">This page has wandered off</h1>
        <p className="mt-4 max-w-xl text-charcoal-soft">
          The link may be old or mistyped. Head back to the homepage to see our livestock and get in touch.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Go to the homepage
        </Link>
      </main>
      <Footer />
    </>
  );
}
