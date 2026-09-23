export function PageHero({
  label,
  title,
  lead,
  above,
  children,
}: {
  label?: string;
  title: string;
  lead?: string;
  /** Rendered above the label, e.g. breadcrumbs. */
  above?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="container-ap">
        {above && <div className="mb-6">{above}</div>}
        {label && <p className="eyebrow">{label}</p>}
        <h1 className="t-h1 mt-3 max-w-3xl">{title}</h1>
        {lead && <p className="t-lead mt-5 max-w-2xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
