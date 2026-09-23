"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { LEFT_PLANE, RIGHT_PLANE, SPARK_PATH } from "@/components/brand/GatewayMark";

const NODES = [
  [60, 60],
  [180, 30],
  [300, 80],
  [420, 40],
  [900, 50],
  [1020, 90],
  [1140, 35],
  [1260, 70],
] as const;

/** Large wordmark with a knowledge network; the gateway closes as the page ends. */
export function FooterGateway() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.5 },
        })
        .fromTo("[data-f-left]", { x: -28 }, { x: 0, ease: "none" }, 0)
        .fromTo("[data-f-right]", { x: 28 }, { x: 0, ease: "none" }, 0)
        .fromTo("[data-f-spark]", { scale: 1, opacity: 1 }, { scale: 0.2, opacity: 0, ease: "none", transformOrigin: "50% 50%" }, 0)
        .fromTo("[data-f-line]", { strokeDashoffset: 200 }, { strokeDashoffset: 0, ease: "none", stagger: 0.02 }, 0);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative mt-24 select-none" aria-hidden>
      <svg viewBox="0 0 1320 120" className="absolute inset-x-0 -top-6 w-full text-cyan/40">
        {NODES.slice(0, -1).map(([x1, y1], i) => {
          const next = NODES[i + 1];
          if (!next || i === 3) return null;
          return (
            <line key={i} data-f-line x1={x1} y1={y1} x2={next[0]} y2={next[1]} stroke="currentColor" strokeDasharray="200" />
          );
        })}
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#25c7ff" style={{ animation: `ap-pulse 3s ${i * 0.4}s infinite` }} />
        ))}
      </svg>
      <div className="relative flex items-end justify-center gap-[3vw]">
        <span className="bg-gradient-to-b from-fg to-fg/10 bg-clip-text text-[9vw] leading-[0.8] font-extrabold tracking-[-0.05em] text-transparent xl:text-[136px]">
          ACCESS
        </span>
        <svg viewBox="14 12 172 180" className="mb-[1vw] h-[7.5vw] shrink-0 overflow-visible xl:h-[112px]">
          <polygon data-f-left points={LEFT_PLANE} fill="#0b2a67" />
          <polygon data-f-right points={RIGHT_PLANE} fill="#086bff" />
          <path data-f-spark d={SPARK_PATH} fill="#fff" />
        </svg>
        <span className="bg-gradient-to-b from-fg to-fg/10 bg-clip-text text-[9vw] leading-[0.8] font-extrabold tracking-[-0.05em] text-transparent xl:text-[136px]">
          POINT
        </span>
      </div>
    </div>
  );
}
