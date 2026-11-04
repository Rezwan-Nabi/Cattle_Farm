/**
 * ─────────────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES IN THIS FILE.
 *
 *  Everything below is PLACEHOLDER copy written to show the layout.
 *  Replace it with the farm's verified information before launch
 *  (see "Content checklist" in README.md). Per the PRD:
 *    - no unverified prices, availability, certifications or claims
 *    - no testimonials without the customer's permission
 * ─────────────────────────────────────────────────────────────────────
 */
import type { Breed, FarmInfo, NavItem, Practice, Service, Testimonial } from "./types";

export const farm: FarmInfo = {
  // TODO: real farm name
  name: "Riverbend Cattle Farm",
  shortName: "Riverbend",
  tagline: "Quality livestock. Trusted farming.",
  description:
    "A family-run cattle farm raising healthy beef and dairy cattle on open pasture, with every animal cared for by people who know it.",
  contact: {
    // TODO: real contact details — these placeholders are not reachable
    phone: "+880 1700-000000",
    whatsapp: "8801700000000",
    email: "hello@example.com",
    addressLines: ["Village Road, Union Name", "Upazila, District", "Bangladesh"],
    mapUrl: undefined,
    hours: ["Saturday to Thursday, 8:00 am – 6:00 pm", "Visits by appointment"],
  },
  // TODO: add real profile URLs, or leave the array empty to hide the links
  social: [
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Livestock", href: "/#livestock" },
  { label: "Services", href: "/#services" },
  { label: "Animal care", href: "/#care" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  headline: "Quality livestock. Trusted farming.",
  description:
    "Healthy, well-handled cattle raised on pasture. Come and see the herd, ask about the animals you need, and buy with confidence.",
  primaryCta: { label: "See our livestock", href: "#livestock" },
  secondaryCta: { label: "Ask about availability", href: "#contact" },
  image: {
    src: "/images/hero-wide-pasture.png",
    alt: "A herd of cattle grazing across a wide green pasture under a blue sky",
    width: 1200,
    height: 798,
  },
};

export const about = {
  heading: "A working farm, run by the people who raise the herd",
  paragraphs: [
    // TODO: replace with the farm's real story — only verified details
    "We started with a handful of animals and a belief that good cattle come from patient, everyday care. The herd has grown, but the routine hasn't: we walk the pasture every morning, know our animals individually and keep careful records for each one.",
    "Buyers are welcome to visit, see the animals in person and ask anything about their feeding, health and handling before they decide.",
  ],
  values: [
    {
      title: "Know every animal",
      description: "Each animal has its own health and feeding record that buyers can review.",
    },
    {
      title: "Open gates",
      description: "Visit before you buy. See the cattle, the sheds and the pasture for yourself.",
    },
    {
      title: "Straight answers",
      description: "Clear information on breed, age and condition. If we don't know, we say so.",
    },
  ],
  image: {
    src: "/images/about-user-cattle-feeding.png",
    alt: "Cattle feeding at a trough on the farm",
    width: 1600,
    height: 2000,
  },
};

// TODO: replace with the farm's actual breeds. Example breeds from the PRD.
// Keep traits to facts the farm can verify; don't list prices or stock counts here.
export const breeds: Breed[] = [
  {
    id: "angus",
    name: "Angus",
    tag: "AN",
    summary: "A hardy beef breed known for good marbling and calm temperament.",
    traits: [
      { label: "Type", value: "Beef" },
      { label: "Coat", value: "Black" },
    ],
    image: { src: "/images/angus-user-final.png", alt: "Black Angus cattle in a pasture", width: 1200, height: 900 },
  },
  {
    id: "hereford",
    name: "Hereford",
    tag: "HE",
    summary: "Docile, efficient grazers that do well on pasture-based systems.",
    traits: [
      { label: "Type", value: "Beef" },
      { label: "Coat", value: "Red with white face" },
    ],
    image: { src: "/images/hereford-user.png", alt: "Hereford cattle standing in a pasture", width: 1200, height: 900 },
  },
  {
    id: "holstein",
    name: "Holstein Friesian",
    tag: "HF",
    summary: "A high-yielding dairy breed for farms focused on milk production.",
    traits: [
      { label: "Type", value: "Dairy" },
      { label: "Coat", value: "Black and white" },
    ],
    image: { src: "/images/holstein-user-new.png", alt: "Holstein Friesian cattle in a green pasture", width: 1200, height: 900 },
  },
  {
    id: "brahman",
    name: "Brahman",
    tag: "BR",
    summary: "Heat-tolerant and resilient, well suited to hot and humid climates.",
    traits: [
      { label: "Type", value: "Beef" },
      { label: "Coat", value: "Grey to red" },
    ],
    image: { src: "/images/brahman-user.png", alt: "Brahman cattle standing in a farm shelter", width: 1200, height: 900 },
  },
];

// TODO: list only services the farm actually offers.
export const services: Service[] = [
  {
    id: "sales",
    title: "Live cattle sales",
    description:
      "Beef and dairy cattle for farms and individual buyers. Tell us what you need and we'll match you with suitable animals.",
    inquirySubject: "Live cattle sales",
  },
  {
    id: "seasonal",
    title: "Seasonal and festival cattle",
    description:
      "Healthy animals for seasonal demand, reserved early and kept on the farm until the date you choose.",
    inquirySubject: "Seasonal and festival cattle",
  },
  {
    id: "breeding",
    title: "Breeding stock",
    description: "Heifers and bulls selected for health and temperament, with their records available on request.",
    inquirySubject: "Breeding stock",
  },
  {
    id: "visits",
    title: "Farm visits",
    description: "Book a time to walk the farm, see the herd and talk through your requirements in person.",
    inquirySubject: "Farm visit",
  },
];

export const care = {
  heading: "How we care for the herd",
  intro:
    // TODO: describe only practices the farm actually follows. Don't mention certifications unless you hold them.
    "Healthy cattle start with routine. These are the practices we follow every day on the farm.",
  practices: [
    {
      title: "Pasture and fresh water",
      description: "Daily grazing on rotated paddocks, with clean water available at all times.",
    },
    {
      title: "Balanced feed",
      description: "Green fodder and supplements planned around each animal's age and purpose.",
    },
    {
      title: "Veterinary checks",
      description: "Regular check-ups and vaccinations, recorded for every animal.",
    },
    {
      title: "Calm handling",
      description: "Low-stress handling and clean, ventilated shelters to keep the herd comfortable.",
    },
  ] satisfies Practice[],
  image: {
    src: "/images/animal-care-user.png",
    alt: "Cattle being cared for inside a covered feeding shelter",
    width: 1600,
    height: 1200,
  },
};

/**
 * Approved customer feedback only. While this list is empty the
 * testimonials section is hidden automatically (PRD FR-07).
 */
export const testimonials: Testimonial[] = [];

export const contactSection = {
  heading: "Ask about our cattle",
  intro:
    "Tell us which animals you're interested in and we'll reply with availability, details and prices. Prefer to talk? Call or message us.",
};
