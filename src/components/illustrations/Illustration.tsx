/*
 * Decorative illustrations for services and courses, drawn as inline SVG so they follow the
 * light/dark theme and cost no image requests. Small looping details (a blinking cursor, moving
 * packets) are CSS animations that stop for visitors who prefer reduced motion.
 * Swap in real photos of the centre and your work when you have them.
 */

export type IllustrationName =
  | "web"
  | "app"
  | "design"
  | "brand"
  | "marketing"
  | "code"
  | "android"
  | "hybrid"
  | "animation"
  | "network"
  | "cloud";

const serviceArt: Record<string, IllustrationName> = {
  "web-development": "web",
  "software-development": "app",
  "ui-ux-design": "design",
  branding: "brand",
  "digital-marketing": "marketing",
  "technical-education": "code",
};

const courseArt: Record<string, { name: IllustrationName; label?: string }> = {
  "android-programming": { name: "android" },
  "hybrid-mobile-apps": { name: "hybrid" },
  "client-side-web-programming": { name: "web" },
  "microsoft-dotnet": { name: "code", label: "C#" },
  "java-programming": { name: "code", label: "Java" },
  "php-training": { name: "code", label: "PHP" },
  animation: { name: "animation" },
  "hardware-and-networking": { name: "network" },
  "cloud-computing": { name: "cloud" },
};

export function ServiceIllustration({ slug, className }: { slug: string; className?: string }) {
  return <Illustration name={serviceArt[slug] ?? "web"} className={className} />;
}

export function CourseIllustration({ slug, className }: { slug: string; className?: string }) {
  const art = courseArt[slug] ?? { name: "code" as const };
  return <Illustration name={art.name} label={art.label} className={className} />;
}

const BLUE = "#086bff";
const CYAN = "#25c7ff";
const NAVY = "#0b2a67";

export function Illustration({ name, label, className = "" }: { name: IllustrationName; label?: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={`illo ${className}`} aria-hidden focusable="false">
      <rect x="0.5" y="0.5" width="319" height="199" rx="12" fill="var(--il-bg)" stroke="var(--line)" />
      {art[name](label)}
    </svg>
  );
}

const Line = ({ x, y, w, o = 1 }: { x: number; y: number; w: number; o?: number }) => (
  <rect x={x} y={y} width={w} height="6" rx="3" fill="var(--il-ink)" opacity={0.35 * o} />
);

const Window = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill="var(--il-card)" stroke="var(--il-line)" />
    <path d={`M${x} ${y + 20}h${w}`} stroke="var(--il-line)" />
    <circle cx={x + 12} cy={y + 10} r="3" fill="#ff6b6b" opacity="0.8" />
    <circle cx={x + 22} cy={y + 10} r="3" fill="#ffc53d" opacity="0.8" />
    <circle cx={x + 32} cy={y + 10} r="3" fill="#3ecf8e" opacity="0.8" />
  </g>
);

const Phone = ({ x, y, w = 70, h = 130 }: { x: number; y: number; w?: number; h?: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="12" fill="var(--il-card)" stroke="var(--il-line)" strokeWidth="1.5" />
    <rect x={x + w / 2 - 10} y={y + 6} width="20" height="4" rx="2" fill="var(--il-line)" />
  </g>
);

const art: Record<IllustrationName, (label?: string) => React.ReactNode> = {
  web: () => (
    <g>
      <Window x={30} y={24} w={260} h={152} />
      <rect x={80} y={29} width="160" height="10" rx="5" fill="var(--il-soft)" />
      <rect className="il-blink" x={92} y={31} width="1.5" height="6" fill={BLUE} />
      <rect x={44} y={56} width="232" height="44" rx="6" fill={BLUE} opacity="0.9" />
      <rect x={56} y={68} width="96" height="7" rx="3.5" fill="#fff" opacity="0.9" />
      <rect x={56} y={81} width="64" height="6" rx="3" fill="#fff" opacity="0.6" />
      {[44, 124, 204].map((x, i) => (
        <g key={x} className="il-rise" style={{ animationDelay: `${i * 0.4}s` }}>
          <rect x={x} y={110} width="72" height="54" rx="6" fill="var(--il-soft)" />
          <rect x={x + 8} y={120} width="28" height="18" rx="4" fill={i === 1 ? CYAN : NAVY} opacity="0.85" />
          <Line x={x + 8} y={146} w={52} />
        </g>
      ))}
    </g>
  ),
  app: () => (
    <g>
      <Phone x={42} y={36} />
      <rect x={52} y={54} width="50" height="30" rx="5" fill={BLUE} opacity="0.9" />
      <Line x={52} y={92} w={50} />
      <Line x={52} y={104} w={36} />
      <rect x={52} y={118} width="22" height="22" rx="5" fill="var(--il-soft)" />
      <rect x={80} y={118} width="22" height="22" rx="5" fill={CYAN} opacity="0.7" />
      <rect x={134} y={40} width="150" height="120" rx="8" fill="var(--il-card)" stroke="var(--il-line)" />
      <Line x={148} y={54} w={60} o={1.4} />
      {[40, 64, 50, 82, 70].map((h, i) => (
        <rect
          key={i}
          className="il-bar"
          style={{ animationDelay: `${i * 0.15}s` }}
          x={152 + i * 24}
          y={146 - h}
          width="14"
          height={h}
          rx="3"
          fill={i === 3 ? BLUE : "var(--il-soft)"}
        />
      ))}
      <path d="M148 146h124" stroke="var(--il-line)" />
    </g>
  ),
  design: () => (
    <g>
      <rect x={30} y={28} width="170" height="144" rx="8" fill="var(--il-card)" stroke="var(--il-line)" strokeDasharray="4 4" />
      <rect x={44} y={42} width="142" height="34" rx="4" fill="none" stroke="var(--il-line)" />
      <path d="M44 42l142 34M186 42L44 76" stroke="var(--il-line)" />
      <Line x={44} y={88} w={100} />
      <Line x={44} y={100} w={70} />
      <rect x={44} y={118} width="64" height="40" rx="4" fill="none" stroke="var(--il-line)" />
      <rect x={122} y={118} width="64" height="40" rx="4" fill="none" stroke="var(--il-line)" />
      <path className="il-draw" d="M214 150C230 90 262 150 284 60" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      <rect x={210} y={146} width="8" height="8" fill="var(--il-card)" stroke={BLUE} strokeWidth="1.5" />
      <rect x={280} y={56} width="8" height="8" fill="var(--il-card)" stroke={BLUE} strokeWidth="1.5" />
      {[BLUE, CYAN, NAVY].map((c, i) => (
        <circle key={c} cx={222 + i * 22} cy={40} r="8" fill={c} />
      ))}
    </g>
  ),
  brand: () => (
    <g>
      <g className="il-float">
        <rect x={52} y={46} width="96" height="96" rx="20" fill={NAVY} />
        <circle cx={100} cy={94} r="26" fill={BLUE} />
        <path d="M100 76c1.4 12 5 15.6 17 17-12 1.4-15.6 5-17 17-1.4-12-5-15.6-17-17 12-1.4 15.6-5 17-17Z" fill="#fff" />
      </g>
      <text x={178} y={96} fontSize="40" fontWeight="700" fill="var(--fg)">
        Aa
      </text>
      <Line x={180} y={110} w={96} o={1.2} />
      <Line x={180} y={122} w={70} />
      {[NAVY, BLUE, CYAN, "var(--il-soft)"].map((c, i) => (
        <rect key={i} x={180 + i * 26} y={140} width="20" height="20" rx="4" fill={c} stroke="var(--il-line)" />
      ))}
    </g>
  ),
  marketing: () => (
    <g>
      <rect x={34} y={30} width="252" height="30" rx="15" fill="var(--il-card)" stroke="var(--il-line)" />
      <circle cx={54} cy={45} r="6" fill="none" stroke={BLUE} strokeWidth="2" />
      <path d="M58.5 49.5l4 4" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
      <Line x={72} y={42} w={120} o={1.3} />
      <rect className="il-blink" x={196} y={39} width="1.5" height="12" fill={BLUE} />
      <rect x={34} y={76} width="252" height="96" rx="8" fill="var(--il-card)" stroke="var(--il-line)" />
      <path d="M50 156h220" stroke="var(--il-line)" />
      <path className="il-draw" d="M52 150l40-18 34 8 40-30 36 6 40-34" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="il-pulse" cx={242} cy={82} r="5" fill={CYAN} />
    </g>
  ),
  code: (label) => (
    <g>
      <Window x={30} y={24} w={260} h={152} />
      {label ? (
        <text x={278} y={14 + 24} textAnchor="end" fontSize="11" fontWeight="700" fill={BLUE}>
          {label}
        </text>
      ) : null}
      {[
        [0, 60, BLUE],
        [1, 110, "var(--il-ink)"],
        [1, 80, CYAN],
        [2, 130, "var(--il-ink)"],
        [2, 70, NAVY],
        [1, 50, "var(--il-ink)"],
        [0, 30, BLUE],
      ].map(([indent, w, c], i) => (
        <g key={i}>
          <text x={42} y={60 + i * 15} fontSize="8" fill="var(--il-ink)" opacity="0.6">
            {i + 1}
          </text>
          <rect x={58 + (indent as number) * 16} y={54 + i * 15} width={w as number} height="7" rx="3.5" fill={c as string} opacity={c === "var(--il-ink)" ? 0.35 : 0.85} />
        </g>
      ))}
      <rect className="il-blink" x={92} y={52 + 7 * 15} width="2" height="11" fill={BLUE} />
      <path d="M232 110l-14 14 14 14M258 110l14 14-14 14" fill="none" stroke={CYAN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  android: () => (
    <g>
      <Phone x={125} y={26} w={80} h={150} />
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            className="il-rise"
            style={{ animationDelay: `${(r * 3 + c) * 0.12}s` }}
            x={135 + c * 22}
            y={50 + r * 24}
            width="16"
            height="16"
            rx="4"
            fill={(r + c) % 3 === 0 ? BLUE : (r + c) % 3 === 1 ? CYAN : "var(--il-soft)"}
          />
        )),
      )}
      <rect x={135} y={130} width="60" height="30" rx="6" fill="var(--il-soft)" />
      <g transform="translate(236 70)" fill="#3ddc84">
        <path d="M0 22a22 22 0 0 1 44 0Z" />
        <rect x="0" y="25" width="44" height="30" rx="4" />
        <circle cx="13" cy="12" r="2.5" fill="var(--il-bg)" />
        <circle cx="31" cy="12" r="2.5" fill="var(--il-bg)" />
      </g>
      <g transform="translate(40 70)">
        <rect width="54" height="54" rx="10" fill="var(--il-card)" stroke="var(--il-line)" />
        <path d="M18 18l-8 9 8 9M36 18l8 9-8 9" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  ),
  hybrid: () => (
    <g>
      <Window x={24} y={36} w={150} h={116} />
      <Line x={36} y={70} w={90} o={1.3} />
      <Line x={36} y={84} w={120} />
      <Line x={36} y={98} w={70} />
      <rect x={36} y={114} width="50" height="24" rx="5" fill={BLUE} opacity="0.85" />
      <path className="il-flow" d="M182 94h40" stroke={CYAN} strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
      <path d="M216 86l8 8-8 8" fill="none" stroke={CYAN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Phone x={232} y={30} w={64} h={124} />
      <Line x={242} y={58} w={44} o={1.3} />
      <Line x={242} y={72} w={36} />
      <rect x={242} y={112} width="44" height="22" rx="5" fill={BLUE} opacity="0.85" />
    </g>
  ),
  animation: () => (
    <g>
      <path d="M40 130C90 30 150 30 180 90S260 140 284 60" fill="none" stroke="var(--il-line)" strokeWidth="2" strokeDasharray="5 6" />
      {[
        [40, 130, 0.15],
        [95, 62, 0.3],
        [150, 58, 0.45],
      ].map(([cx, cy, o]) => (
        <circle key={cx} cx={cx} cy={cy} r="11" fill={BLUE} opacity={o} />
      ))}
      <circle className="il-float" cx={200} cy={108} r="13" fill={BLUE} />
      <rect x={30} y={152} width="260" height="28" rx="6" fill="var(--il-card)" stroke="var(--il-line)" />
      <path d="M40 166h240" stroke="var(--il-line)" />
      {[60, 120, 190, 260].map((x) => (
        <rect key={x} x={x - 5} y={161} width="10" height="10" transform={`rotate(45 ${x} 166)`} fill={x === 190 ? CYAN : NAVY} />
      ))}
      <rect className="il-scrub" x={120} y={154} width="2" height="24" fill={BLUE} />
    </g>
  ),
  network: () => {
    const nodes: [number, number][] = [
      [70, 60],
      [160, 40],
      [250, 64],
      [110, 140],
      [210, 146],
    ];
    const edges: [number, number][] = [
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 3],
      [1, 4],
      [2, 4],
      [3, 4],
    ];
    const at = (i: number) => nodes[i] ?? [0, 0];
    return (
      <g>
        {edges.map(([a, b]) => (
          <line key={`${a}${b}`} x1={at(a)[0]} y1={at(a)[1]} x2={at(b)[0]} y2={at(b)[1]} stroke="var(--il-line)" strokeWidth="2" />
        ))}
        {edges.slice(0, 4).map(([a, b], i) => (
          <line
            key={`p${a}${b}`}
            className="il-flow"
            style={{ animationDelay: `${i * 0.3}s` }}
            x1={at(a)[0]}
            y1={at(a)[1]}
            x2={at(b)[0]}
            y2={at(b)[1]}
            stroke={CYAN}
            strokeWidth="3"
            strokeDasharray="4 22"
            strokeLinecap="round"
          />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 18} y={y - 13} width="36" height="26" rx="5" fill={i === 1 ? BLUE : "var(--il-card)"} stroke={i === 1 ? BLUE : "var(--il-line)"} />
            <circle className={i === 1 ? "il-pulse" : undefined} cx={x - 8} cy={y + 5} r="2" fill={i === 1 ? "#fff" : "#3ecf8e"} />
          </g>
        ))}
      </g>
    );
  },
  cloud: () => (
    <g>
      <path
        className="il-float"
        d="M110 96a28 28 0 0 1 8-55 38 38 0 0 1 72 6 26 26 0 0 1 12 51Z"
        fill={BLUE}
        opacity="0.9"
      />
      {[80, 145, 210].map((x, i) => (
        <g key={x}>
          <path
            className="il-flow"
            style={{ animationDelay: `${i * 0.3}s` }}
            d={`M${x + 15} 138V${104}`}
            stroke={CYAN}
            strokeWidth="2.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <rect x={x} y={138} width="30" height="36" rx="4" fill="var(--il-card)" stroke="var(--il-line)" />
          <path d={`M${x + 6} 150h18M${x + 6} 160h18`} stroke="var(--il-line)" strokeWidth="2" />
          <circle cx={x + 22} cy={168} r="1.8" fill="#3ecf8e" />
        </g>
      ))}
    </g>
  ),
};
