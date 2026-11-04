"use client";

import { requestInquiry } from "@/lib/inquiry";

type InquiryLinkProps = {
  subject: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * A link to the contact form that also pre-fills the inquiry subject.
 * Without JavaScript it still works as a plain anchor link.
 */
export default function InquiryLink({ subject, className, children }: InquiryLinkProps) {
  return (
    <a href="#contact" className={className} onClick={() => requestInquiry(subject)}>
      {children}
    </a>
  );
}
