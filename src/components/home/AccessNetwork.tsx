"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { SPARK_PATH } from "@/components/brand/GatewayMark";

const NODES = [
  { label: "Technology", x: 120, y: 90 },
  { label: "Knowledge", x: 480, y: 70 },
  { label: "Design", x: 560, y: 260 },
  { label: "Education", x: 340, y: 360 },
  { label: "Opportunity", x: 90, y: 280 },
] as const;
const CENTER = { x: 330, y: 200 };
// Ring connections between neighbouring ideas.
const EDGES = NODES.map((_, i) => [i, (i + 1) % NODES.length] as const);

/** Technology · Knowledge · Design · Education · Opportunity — connected through the gateway. */
export function AccessNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center 45%", scrub: 0.6 },
      });
      tl.fromTo("[data-n-spoke]", { strokeDashoffset: 400 }, { strokeDashoffset: 0, stagger: 0.08, ease: "none" }, 0)
        .fromTo("[data-n-node]", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, stagger: 0.08, ease: "back.out(2)" }, 0.1)
        .fromTo("[data-n-edge]", { strokeDashoffset: 500 }, { strokeDashoffset: 0, stagger: 0.06, ease: "none" }, 0.35)
        .fromTo("[data-n-label]", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.06 }, 0.4);
    },
    { scope: ref },
  );

  const connected = (i: number) => hover === null || hover === i || EDGES.some(([a, b]) => (a === hover && b === i) || (b === hover && a === i));

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 660 430" className="w-full overflow-visible" role="img" aria-labelledby="network-title">
        <title id="network-title">Technology, Knowledge, Design, Education and Opportunity, connected through the gateway</title>
        <defs>
          <radialGradient id="net-glow">
            <stop offset="0" stopColor="#086bff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#086bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={CENTER.x} cy={CENTER.y} r="120" fill="url(#net-glow)" />
        {EDGES.map(([a, b]) => {
          const A = NODES[a]!;
          const B = NODES[b]!;
          const on = hover === null || hover === a || hover === b;
          return (
            <line
              key={`${a}-${b}`}
              data-n-edge
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="#25c7ff"
              strokeOpacity={on ? 0.45 : 0.08}
              strokeDasharray="500"
              className="transition-[stroke-opacity] duration-300"
            />
          );
        })}
        {NODES.map((n, i) => (
          <line
            key={n.label}
            data-n-spoke
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            stroke="#086bff"
            strokeOpacity={connected(i) ? 0.8 : 0.12}
            strokeWidth="1.5"
            strokeDasharray="400"
            className="transition-[stroke-opacity] duration-300"
          />
        ))}
        <g transform={`translate(${CENTER.x - 100} ${CENTER.y - 100})`}>
          <path d={SPARK_PATH} fill="#fff" transform="translate(100 100) scale(1.4) translate(-100 -100)" />
        </g>
        {NODES.map((n, i) => (
          <g key={n.label} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
            <circle data-n-node cx={n.x} cy={n.y} r={hover === i ? 11 : 8} fill="#04070d" stroke="#25c7ff" strokeWidth="2.5" className="transition-[r] duration-300" />
            <text
              data-n-label
              x={n.x}
              y={n.y + (n.y > CENTER.y ? 36 : -22)}
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill={connected(i) ? "#f6f8fc" : "#6b7c94"}
              className="transition-[fill] duration-300"
              style={{ letterSpacing: "-0.01em" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
