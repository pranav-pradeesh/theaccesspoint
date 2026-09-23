import { SectionLabel } from "./SectionLabel";

export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 lg:pt-52 lg:pb-24">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-ap relative">
        <div data-reveal>
          <SectionLabel>{label}</SectionLabel>
        </div>
        <h1 data-reveal data-reveal-delay="0.08" className="t-h1 mt-8 max-w-[18ch]">
          {title}
        </h1>
        {lead && (
          <p data-reveal data-reveal-delay="0.16" className="t-lead mt-8 max-w-2xl text-fg-2">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
