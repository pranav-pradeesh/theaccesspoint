// `index` is accepted for call-site compatibility but no longer rendered — plain labels read more professionally.
export function SectionLabel({ children, light }: { index?: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`t-micro flex items-center gap-3 ${light ? "text-electric-hover" : "text-cyan"}`}>
      <span aria-hidden className={`h-px w-8 ${light ? "bg-electric-hover" : "bg-cyan"}`} />
      {children}
    </p>
  );
}
