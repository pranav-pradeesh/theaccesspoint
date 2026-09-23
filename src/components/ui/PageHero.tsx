export function PageHero({
  label,
  title,
  lead,
  above,
  aside,
  children,
}: {
  label?: string;
  title: string;
  lead?: string;
  /** Rendered above the label, e.g. breadcrumbs. */
  above?: React.ReactNode;
  /** Shown beside the text on large screens, e.g. an illustration. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const text = (
    <div>
      {label && <p className="eyebrow">{label}</p>}
      <h1 className="t-h1 mt-3 max-w-3xl">{title}</h1>
      {lead && <p className="t-lead mt-5 max-w-2xl">{lead}</p>}
      {children}
    </div>
  );
  return (
    <section className="border-b border-line pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="container-ap">
        {above && <div className="mb-6">{above}</div>}
        {aside ? (
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            {text}
            <div className="mx-auto w-full max-w-md lg:max-w-none">{aside}</div>
          </div>
        ) : (
          text
        )}
      </div>
    </section>
  );
}
