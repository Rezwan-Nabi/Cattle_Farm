type EarTagProps = {
  /** Short code printed on the tag, e.g. "AN". */
  code: string;
  className?: string;
  /** Tag colour; defaults to ear-tag yellow. */
  tone?: "yellow" | "hay";
  /** Set when the tag is purely decorative. */
  decorative?: boolean;
  label?: string;
};

const TAG_PATH =
  "M14 6a6 6 0 0 1 12 0v6h6a6 6 0 0 1 6 6v26a8 8 0 0 1-8 8H10a8 8 0 0 1-8-8V18a6 6 0 0 1 6-6h6z";

/** A livestock ear tag — the site's signature mark. */
export default function EarTag({ code, className, tone = "yellow", decorative = true, label }: EarTagProps) {
  const fill = tone === "yellow" ? "var(--color-tag)" : "var(--color-hay-300)";
  const ink = tone === "yellow" ? "var(--color-tag-ink)" : "var(--color-pasture-950)";

  return (
    <svg
      viewBox="0 0 40 52"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
    >
      <path d={TAG_PATH} fill={fill} />
      <circle cx="20" cy="6.5" r="2.6" fill="var(--color-pasture-950)" opacity="0.85" />
      <text
        x="20"
        y="37"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="700"
        fontSize={code.length > 2 ? 11 : 15}
        fill={ink}
      >
        {code}
      </text>
    </svg>
  );
}
