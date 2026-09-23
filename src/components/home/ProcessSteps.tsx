import { SectionLabel } from "@/components/ui/SectionLabel";

type Step = { index: string; title: string; line: string };

export function ProcessSteps({ steps, label = "05" }: { steps: readonly Step[]; label?: string }) {
  return (
    <section className="section bg-surface-1" aria-labelledby="process-heading">
      <div className="container-ap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-reveal>
              <SectionLabel index={label}>Process</SectionLabel>
            </div>
            <h2 id="process-heading" data-reveal className="t-h1 mt-6 max-w-[14ch]">
              From first idea to growing product.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-fg-2">
            Six clear stages, the same for every project — so you always know where we are and what happens next.
          </p>
        </div>

        <ol data-reveal="stagger" className="mt-14 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.index} className="bg-surface-1 p-7 lg:p-9">
              <p className="t-micro text-cyan">{s.index}</p>
              <h3 className="t-h3 mt-6">{s.title}</h3>
              <p className="mt-3 text-fg-2">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
