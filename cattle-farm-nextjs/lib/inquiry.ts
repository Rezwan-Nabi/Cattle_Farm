/** Fired when a visitor clicks "Ask about …" so the contact form can pre-fill its subject. */
export const INQUIRY_EVENT = "farm:inquiry-subject";

export function requestInquiry(subject: string) {
  window.dispatchEvent(new CustomEvent<string>(INQUIRY_EVENT, { detail: subject }));
}
