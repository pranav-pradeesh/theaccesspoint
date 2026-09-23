"use client";

import { useState } from "react";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { track } from "@/lib/analytics/track";
import type { Service } from "@/lib/cms/types";

/**
 * Desktop: hovering or focusing a service swaps a contextual visual + detail panel.
 * Touch: every service shows its detail inline — no hover-dependent content.
 */
export function ServicesExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active] ?? services[0];
  if (!current) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="border-t border-line lg:col-span-7" data-reveal="stagger">
        {services.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.slug} className="border-b border-line">
              <TransitionLink
                href={`/services#${s.slug}`}
                data-cursor="open"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => track("Service Interaction", { service: s.title, source: "home" })}
                className="group flex items-start gap-5 py-6 lg:items-center lg:py-7"
              >
                <span className={`t-micro pt-2 transition-colors lg:pt-0 ${isActive ? "text-cyan" : "text-fg-3"}`}>{s.index}</span>
                <span className="flex-1">
                  <span
                    className={`block text-[clamp(1.6rem,3.2vw,2.75rem)] leading-tight font-bold tracking-[-0.025em] transition-[color,transform] duration-500 ease-[var(--ease-access)] lg:group-hover:translate-x-2 ${
                      isActive ? "lg:text-fg" : "lg:text-fg/40"
                    }`}
                  >
                    {s.title}
                    {s.upcoming && <span className="tag ml-3 align-middle">Coming soon</span>}
                  </span>
                  <span className="mt-2 block text-fg-2 lg:hidden">{s.summary}</span>
                  <span className="mt-3 flex flex-wrap gap-2 lg:hidden">
                    {s.offerings.slice(0, 3).map((o) => (
                      <span key={o} className="tag">
                        {o}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`hidden text-2xl transition-all duration-500 lg:block ${isActive ? "translate-x-0 text-cyan opacity-100" : "-translate-x-3 opacity-0"}`}
                >
                  →
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="card-gateway sticky top-28 p-8 hover:translate-y-0!" aria-live="polite">
          <div className="hairline-glow absolute inset-x-0 top-0" aria-hidden />
          <div key={current.slug} className="animate-[hero-rise_0.7s_var(--ease-access)_both]">
            <div className="grid-lines relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface-1">
              <ServiceVisual kind={current.visual} className="absolute inset-0 size-full p-4" />
            </div>
            <p className="t-micro mt-7 text-cyan">
              {`[ ${current.index} // ${current.title} ]`}
            </p>
            <p className="mt-3 text-lg leading-snug text-fg">{current.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {current.offerings.map((o) => (
                <li key={o} className="tag">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
