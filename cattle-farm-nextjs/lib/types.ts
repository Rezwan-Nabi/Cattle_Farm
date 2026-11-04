export type ImageAsset = {
  src: string;
  /** Describe what is actually in the photo — used by screen readers and search engines. */
  alt: string;
  width: number;
  height: number;
};

export type FarmInfo = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: {
    phone?: string;
    /** International format without spaces or "+", e.g. 8801712345678. Enables the WhatsApp link. */
    whatsapp?: string;
    email?: string;
    addressLines: string[];
    mapUrl?: string;
    hours?: string[];
  };
  social: { label: string; href: string }[];
};

export type Breed = {
  id: string;
  name: string;
  /** Short identifier printed on the card's ear tag. */
  tag: string;
  summary: string;
  /** Only verified facts. Leave out anything you can't stand behind. */
  traits: { label: string; value: string }[];
  image: ImageAsset;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  inquirySubject: string;
};

export type Practice = {
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Dairy farmer, Gazipur". Publish only with the customer's permission. */
  context?: string;
};

export type NavItem = { label: string; href: string };
