import { TransitionLink } from "@/components/transitions/TransitionLink";

export function CtaBand({
  title = "Have something in mind?",
  lead = "Let's turn the idea into something people can experience.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-ap">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[20px] border border-line px-6 py-16 text-center sm:px-12 lg:py-24"
          style={{ background: "radial-gradient(80% 120% at 50% 0%, rgba(8,107,255,0.28) 0%, #080e1a 65%)" }}
        >
          <div className="hairline-glow absolute inset-x-0 top-0" aria-hidden />
          <h2 className="t-h1 mx-auto max-w-[16ch]">{title}</h2>
          <p className="t-lead mx-auto mt-6 max-w-xl text-fg-2">{lead}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TransitionLink href="/contact" data-magnetic data-track="CTA Band" className="btn btn-primary btn-lg">
              Start a Project <span className="arrow">→</span>
            </TransitionLink>
            <TransitionLink href="/work" className="btn btn-secondary btn-lg">
              Explore Our Work
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
