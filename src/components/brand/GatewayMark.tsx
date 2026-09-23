import { useId } from "react";

export const SPARK_PATH =
  "M100 76C101.8 93 107 98.2 124 100C107 101.8 101.8 107 100 124C98.2 107 93 101.8 76 100C93 98.2 98.2 93 100 76Z";
export const LEFT_PLANE = "40,34 96,22 96,182 40,168";
export const RIGHT_PLANE = "104,22 160,34 160,168 104,182";

/**
 * The gateway mark: two-plane portal (navy foundation + electric entry),
 * perspective pathway (cyan) and the four-point spark.
 * `split` pushes the planes apart — 0 is closed, ~18 is the resting logo.
 */
export function GatewayMark({
  split = 16,
  className,
  title,
  mono,
}: {
  split?: number;
  className?: string;
  title?: string;
  mono?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="14 12 172 180"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b2a67" />
          <stop offset="1" stopColor="#071530" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#086bff" />
          <stop offset="1" stopColor="#0b4fd6" />
        </linearGradient>
        <radialGradient id={`${id}g`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#25c7ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#25c7ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {!mono && <ellipse cx="100" cy="104" rx="46" ry="70" fill={`url(#${id}g)`} />}
      <g stroke={mono ? "currentColor" : "#25c7ff"} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M100 124L56 186" opacity="0.55" />
        <path d="M100 124L80 186" />
        <path d="M100 124L120 186" />
        <path d="M100 124L144 186" opacity="0.55" />
      </g>
      <polygon points={LEFT_PLANE} transform={`translate(${-split} 0)`} fill={mono ? "currentColor" : `url(#${id}l)`} />
      <polygon
        points={RIGHT_PLANE}
        transform={`translate(${split} 0)`}
        fill={mono ? "currentColor" : `url(#${id}r)`}
        opacity={mono ? 0.75 : 1}
      />
      <path d={SPARK_PATH} fill={mono ? "currentColor" : "#ffffff"} />
    </svg>
  );
}

/** Spark alone — used inside the page-transition gateway. */
export function GatewayGlyph() {
  return (
    <svg viewBox="70 70 60 60" className="size-full drop-shadow-[0_0_24px_rgba(37,199,255,0.8)]" aria-hidden>
      <path d={SPARK_PATH} fill="#ffffff" />
    </svg>
  );
}
