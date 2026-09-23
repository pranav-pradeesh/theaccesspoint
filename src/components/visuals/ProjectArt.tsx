import { useId } from "react";
import { GatewayMark, LEFT_PLANE, RIGHT_PLANE, SPARK_PATH } from "@/components/brand/GatewayMark";
import type { Project } from "@/lib/cms/types";
import { ServiceVisual } from "./ServiceVisual";

/** Generated cover artwork for case studies — vector, crisp at any size, tiny to ship. */
export function ProjectCover({ cover, className = "" }: { cover: Project["cover"]; className?: string }) {
  if (cover === "academy") {
    return (
      <div className={`relative overflow-hidden bg-[radial-gradient(120%_90%_at_30%_20%,#0b2a67_0%,#04070d_70%)] ${className}`}>
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <ServiceVisual kind="education" className="absolute inset-0 m-auto h-[82%] w-[82%]" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-[radial-gradient(90%_80%_at_50%_45%,rgba(8,107,255,0.35)_0%,#04070d_70%)] ${className}`}>
      <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
      <PerspectiveFloor />
      <GatewayMark split={22} className="absolute inset-0 m-auto h-[62%] w-auto overflow-visible drop-shadow-[0_30px_60px_rgba(8,107,255,0.45)]" />
    </div>
  );
}

function PerspectiveFloor() {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
      <g stroke="#25c7ff" strokeOpacity="0.22" fill="none">
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M400 300L${i * 80} 500`} />
        ))}
        {[330, 370, 420, 480].map((y) => (
          <path key={y} d={`M0 ${y}H800`} strokeOpacity={0.08 + (y - 300) / 1000} />
        ))}
      </g>
    </svg>
  );
}

type Art = Project["gallery"][number]["art"];

/** Gallery plates: construction drawings of the actual system, not mock screenshots. */
export function GalleryArt({ art }: { art: Art }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  switch (art) {
    case "system":
      return (
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden>
          <g stroke="#086bff" strokeOpacity="0.35" fill="none" strokeDasharray="3 4">
            <path d="M0 150H400M200 0V300" />
            <circle cx="200" cy="150" r="118" />
            <path d="M40 34L96 22V182L40 168Z" transform="translate(98 48)" />
          </g>
          <g transform="translate(92 40) scale(1.08)">
            <polygon points={LEFT_PLANE} fill="#0b2a67" transform="translate(-14 0)" />
            <polygon points={RIGHT_PLANE} fill="#086bff" transform="translate(14 0)" />
            <path d={SPARK_PATH} fill="#101726" />
          </g>
          <text x="16" y="286" fontSize="11" fill="#4b586e" fontFamily="var(--font-mono)" letterSpacing="1.5">
            CLEAR SPACE = 1.5 × SPARK
          </text>
        </svg>
      );
    case "type":
      return (
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden>
          {[
            [120, 64, 800, "Display"],
            [72, 138, 700, "H1 Heading"],
            [48, 190, 700, "H2 Section"],
            [30, 232, 600, "H3 Subsection"],
            [16, 262, 400, "Body standard — 16 / 1.65"],
          ].map(([size, y, weight, label]) => (
            <text
              key={String(label)}
              x="20"
              y={Number(y)}
              fontSize={Number(size) / 2}
              fontWeight={Number(weight)}
              fill="#101726"
              letterSpacing="-1"
              fontFamily="var(--font-sans)"
            >
              {label}
            </text>
          ))}
          <text x="20" y="288" fontSize="10" fill="#086bff" fontFamily="var(--font-mono)" letterSpacing="1.5">
            [ 01 // MICRO — JETBRAINS MONO ]
          </text>
        </svg>
      );
    case "motion":
      return (
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden>
          {[0, 1, 2, 3].map((step) => (
            <g key={step} transform={`translate(${16 + step * 96} 70) scale(0.4)`}>
              {step > 1 && <path d="M100 124L64 186M100 124L136 186" stroke="#25c7ff" strokeWidth="4" />}
              <polygon points={LEFT_PLANE} fill="#0b2a67" transform={`translate(${-step * 9} 0)`} />
              <polygon points={RIGHT_PLANE} fill="#086bff" transform={`translate(${step * 9} 0)`} />
              {step > 2 && <path d={SPARK_PATH} fill="#25c7ff" transform={`translate(100 100) scale(${step / 3}) translate(-100 -100)`} />}
            </g>
          ))}
          <path d="M20 230H380" stroke="#101726" strokeOpacity="0.2" />
          {["CLOSED", "SPLIT", "PATHWAY", "SPARK"].map((l, i) => (
            <text key={l} x={56 + i * 96} y="254" fontSize="10" textAnchor="middle" fill="#4b586e" fontFamily="var(--font-mono)" letterSpacing="1.5">
              {`0${i + 1} ${l}`}
            </text>
          ))}
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={20 + i * 30.5} y="20" width="26" height="260" fill="#086bff" fillOpacity="0.08" />
          ))}
          <rect x="20" y="60" width="178" height="60" fill="#101726" />
          <rect x="20" y="136" width="117" height="12" fill="#4b586e" />
          <rect x="233" y="60" width="148" height="190" fill="#086bff" />
        </svg>
      );
    case "courses":
      return (
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden>
          <path d="M40 240C120 240 120 150 200 150S280 60 360 60" stroke="#086bff" strokeWidth="3" fill="none" />
          {[
            [40, 240, "Foundations"],
            [200, 150, "Practice"],
            [360, 60, "Build"],
          ].map(([x, y, l], i) => (
            <g key={String(l)}>
              <circle cx={Number(x)} cy={Number(y)} r="12" fill={i === 0 ? "#086bff" : "#fff"} stroke="#086bff" strokeWidth="3" />
              <text x={Number(x)} y={Number(y) + 34} textAnchor="middle" fontSize="13" fontWeight="600" fill="#101726" fontFamily="var(--font-sans)">
                {l}
              </text>
            </g>
          ))}
        </svg>
      );
    case "architecture":
      return (
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden>
          <defs>
            <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill="#086bff" />
            </marker>
          </defs>
          {[
            [140, 30, "theaccesspoint.com"],
            [30, 130, "/work · /insights"],
            [250, 130, "/academy"],
            [250, 230, "PostgreSQL"],
          ].map(([x, y, l]) => (
            <g key={String(l)}>
              <rect x={Number(x)} y={Number(y)} width="120" height="44" rx="8" fill="#fff" stroke="#101726" strokeOpacity="0.2" />
              <text x={Number(x) + 60} y={Number(y) + 27} textAnchor="middle" fontSize="11" fill="#101726" fontFamily="var(--font-mono)">
                {l}
              </text>
            </g>
          ))}
          <g stroke="#086bff" strokeWidth="1.5" fill="none" markerEnd={`url(#${id})`}>
            <path d="M180 74L100 128" />
            <path d="M220 74L300 128" />
            <path d="M310 174V226" />
          </g>
        </svg>
      );
  }
}
