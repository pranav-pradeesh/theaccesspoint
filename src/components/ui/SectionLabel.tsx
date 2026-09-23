export function SectionLabel({ index, children, light }: { index?: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`t-micro flex items-center gap-3 ${light ? "text-electric-hover" : "text-cyan"}`}>
      <span aria-hidden className={`h-px w-8 ${light ? "bg-electric-hover" : "bg-cyan"}`} />
      {index ? `[ ${index} // ${children} ]` : children}
    </p>
  );
}
