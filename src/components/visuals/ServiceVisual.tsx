import { useId } from "react";
import type { ServiceVisualKey } from "@/lib/cms/types";

/**
 * Contextual, generated vector visuals for each service (no stock imagery).
 * Animations are CSS-only and are neutralised by prefers-reduced-motion.
 */
export function ServiceVisual({ kind, className }: { kind: ServiceVisualKey; className?: string }) {
  const id = `sv${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#086bff" />
          <stop offset="1" stopColor="#25c7ff" />
        </linearGradient>
      </defs>
      {visuals(`url(#${id})`)[kind]}
    </svg>
  );
}

const draw = (delay = 0) => ({
  strokeDasharray: 600,
  strokeDashoffset: 600,
  animation: `ap-dash 1.6s ${delay}s cubic-bezier(0.16,1,0.3,1) forwards`,
});
const pulse = (delay = 0) => ({ animation: `ap-pulse 2.4s ${delay}s ease-in-out infinite` });

const visuals = (blue: string): Record<ServiceVisualKey, React.ReactNode> => ({
  // Browser / window composition
  web: (
    <g>
      <rect x="40" y="36" width="320" height="228" rx="14" fill="#0e1726" stroke="rgba(255,255,255,0.12)" />
      <path d="M40 72H360" stroke="rgba(255,255,255,0.1)" />
      {[60, 76, 92].map((x, i) => (
        <circle key={x} cx={x} cy="54" r="5" fill={i === 0 ? "#25c7ff" : "rgba(255,255,255,0.2)"} />
      ))}
      <rect x="120" y="46" width="200" height="16" rx="8" fill="rgba(255,255,255,0.05)" />
      <rect x="64" y="96" width="150" height="16" rx="4" fill="#f6f8fc" opacity="0.9" />
      <rect x="64" y="122" width="110" height="10" rx="3" fill="rgba(255,255,255,0.25)" />
      <rect x="64" y="148" width="70" height="24" rx="12" fill={blue} style={pulse(0.2)} />
      <rect x="236" y="96" width="100" height="142" rx="10" fill="rgba(8,107,255,0.14)" stroke="rgba(37,199,255,0.4)" />
      <path d="M252 206L286 150L318 206Z" fill="none" stroke="#25c7ff" strokeWidth="2" style={draw(0.3)} />
      {[196, 214, 232].map((y, i) => (
        <rect key={y} x="64" y={y} width={140 - i * 30} height="8" rx="3" fill="rgba(255,255,255,0.1)" />
      ))}
    </g>
  ),
  // System architecture
  software: (
    <g fill="none" strokeWidth="1.5">
      {[
        [200, 60],
        [90, 150],
        [200, 150],
        [310, 150],
        [140, 240],
        [260, 240],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect
            x={(x ?? 0) - 44}
            y={(y ?? 0) - 18}
            width="88"
            height="36"
            rx="8"
            fill={i === 0 ? "rgba(8,107,255,0.2)" : "#0e1726"}
            stroke={i === 0 ? "#25c7ff" : "rgba(255,255,255,0.18)"}
          />
          <rect x={(x ?? 0) - 30} y={(y ?? 0) - 4} width="60" height="8" rx="3" fill="rgba(255,255,255,0.18)" stroke="none" />
        </g>
      ))}
      {[
        "M200 78V132",
        "M180 78L100 132",
        "M220 78L300 132",
        "M200 168L150 222",
        "M200 168L250 222",
        "M310 168L270 222",
      ].map((d, i) => (
        <path key={d} d={d} stroke="#25c7ff" style={draw(i * 0.12)} />
      ))}
      <circle r="4" fill="#25c7ff" className="motion-reduce:hidden">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M200 78V132L200 168L250 222" />
      </circle>
    </g>
  ),
  // Interface / components
  design: (
    <g>
      <rect x="60" y="40" width="140" height="220" rx="16" fill="#0e1726" stroke="rgba(255,255,255,0.14)" />
      <rect x="76" y="60" width="108" height="70" rx="8" fill={blue} opacity="0.85" />
      <rect x="76" y="142" width="80" height="10" rx="3" fill="#f6f8fc" />
      <rect x="76" y="160" width="100" height="8" rx="3" fill="rgba(255,255,255,0.25)" />
      <rect x="76" y="210" width="108" height="32" rx="16" fill="#086bff" />
      <g stroke="#25c7ff" strokeDasharray="4 4" fill="none">
        <rect x="222" y="60" width="120" height="44" rx="10" style={pulse(0)} />
        <rect x="222" y="120" width="120" height="44" rx="22" style={pulse(0.4)} />
        <rect x="222" y="180" width="54" height="54" rx="10" style={pulse(0.8)} />
        <circle cx="315" cy="207" r="27" style={pulse(1.2)} />
      </g>
      <path d="M200 82H222M200 142H222" stroke="rgba(255,255,255,0.25)" />
    </g>
  ),
  // Typography / identity
  brand: (
    <g>
      <text x="200" y="180" textAnchor="middle" fontSize="150" fontWeight="800" fill="#f6f8fc" letterSpacing="-6" fontFamily="var(--font-sans)">
        Aa
      </text>
      <path d="M40 180H360M40 88H360M40 204H360" stroke="#25c7ff" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
      {[
        ["#071530", 70],
        ["#0b2a67", 130],
        ["#086bff", 190],
        ["#25c7ff", 250],
        ["#f6f8fc", 310],
      ].map(([c, x], i) => (
        <rect key={String(c)} x={Number(x) - 22} y="236" width="44" height="28" rx="6" fill={String(c)} stroke="rgba(255,255,255,0.15)" style={pulse(i * 0.25)} />
      ))}
      <text x="40" y="60" fill="#94a3b8" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="2">
        MANROPE / 800 / -0.035EM
      </text>
    </g>
  ),
  // Search & growth
  marketing: (
    <g fill="none">
      <rect x="50" y="40" width="300" height="40" rx="20" fill="#0e1726" stroke="rgba(37,199,255,0.4)" />
      <circle cx="76" cy="60" r="8" stroke="#25c7ff" strokeWidth="2" />
      <path d="M82 66L88 72" stroke="#25c7ff" strokeWidth="2" />
      <rect x="100" y="55" width="140" height="10" rx="4" fill="rgba(255,255,255,0.25)" />
      <path d="M60 250H350M60 250V110" stroke="rgba(255,255,255,0.15)" />
      <path d="M60 236L110 220L160 226L210 184L260 172L310 130L345 118" stroke={blue} strokeWidth="3" style={draw(0)} />
      {[
        [110, 220],
        [210, 184],
        [310, 130],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#25c7ff" style={pulse(i * 0.3)} />
      ))}
    </g>
  ),
  // Knowledge network
  education: (
    <g>
      {[
        ["M200 150L100 80", 0],
        ["M200 150L300 80", 0.1],
        ["M200 150L80 200", 0.2],
        ["M200 150L320 210", 0.3],
        ["M200 150L200 260", 0.4],
        ["M100 80L200 40L300 80", 0.5],
        ["M80 200L200 260L320 210", 0.6],
      ].map(([d, delay]) => (
        <path key={String(d)} d={String(d)} stroke="#25c7ff" strokeOpacity="0.6" fill="none" style={draw(Number(delay))} />
      ))}
      {[
        [200, 40],
        [100, 80],
        [300, 80],
        [80, 200],
        [320, 210],
        [200, 260],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill="#0e1726" stroke="#25c7ff" strokeWidth="2" style={pulse(i * 0.3)} />
      ))}
      <circle cx="200" cy="150" r="30" fill="rgba(8,107,255,0.25)" stroke="#086bff" />
      <path
        d="M200 132C201 145 205 149 218 150C205 151 201 155 200 168C199 155 195 151 182 150C195 149 199 145 200 132Z"
        fill="#fff"
      />
    </g>
  ),
});
