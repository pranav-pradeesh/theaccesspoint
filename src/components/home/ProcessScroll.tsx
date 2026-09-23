"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/animations/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Step = { index: string; title: string; line: string };

/**
 * Desktop: the section pins and the six stages travel horizontally with scroll.
 * Mobile / reduced motion: a plain vertical sequence — no pinning, no scroll-jacking.
 */
export function ProcessScroll({ steps }: { steps: readonly Step[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - el.clientWidth;
        gsap.to(el.children, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          "[data-process-progress]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "0 50%",
            scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-surface-1 py-20 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="container-ap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div data-reveal>
              <SectionLabel index="05">Process</SectionLabel>
            </div>
            <h2 data-reveal className="t-h1 mt-6 max-w-[14ch]">
              From first idea to growing product.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-fg-2">
            Six clear stages, the same for every project — so you always know where we are and what happens next.
          </p>
        </div>
        <div className="relative mt-12 hidden h-px bg-line lg:block" aria-hidden>
          <div data-process-progress className="absolute inset-0 origin-left scale-x-0 bg-cyan" />
        </div>
      </div>

      <ol
        ref={track}
        data-cursor="drag"
        className="container-ap mt-10 grid gap-4 lg:mt-12 lg:flex lg:max-w-none! lg:gap-6 lg:overflow-visible lg:pr-[20vw]"
      >
        {steps.map((s, i) => (
          <li
            key={s.index}
            className="card-gateway flex shrink-0 flex-col p-7 hover:translate-y-0! lg:min-h-[340px] lg:w-[400px] lg:p-9"
          >
            <p className="t-micro text-cyan">
              {`[ ${s.index} // ${s.title} ]`}
            </p>
            <p className="mt-auto pt-10 text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-extrabold tracking-[-0.035em] uppercase">
              {s.title}
            </p>
            <p className="mt-5 text-fg-2">{s.line}</p>
            {i < steps.length - 1 && (
              <span aria-hidden className="t-micro mt-6 text-fg-3 lg:hidden">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
