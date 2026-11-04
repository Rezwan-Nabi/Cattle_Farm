import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Livestock from "@/components/Livestock";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Sustainability from "@/components/Sustainability";
import Testimonials from "@/components/Testimonials";
import { farm } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: farm.name,
    description: farm.description,
    url: siteUrl,
    image: `${siteUrl}/images/cow-og.jpg`,
    ...(farm.contact.phone && { telephone: farm.contact.phone }),
    ...(farm.contact.email && { email: farm.contact.email }),
    address: {
      "@type": "PostalAddress",
      streetAddress: farm.contact.addressLines.join(", "),
    },
    sameAs: farm.social.map((s) => s.href),
  };

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Livestock />
        <Services />
        <Sustainability />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        // Built from our own content file, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
