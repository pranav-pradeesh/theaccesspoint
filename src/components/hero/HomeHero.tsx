"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/animations/gsap";
import { gatewayIntro, gatewayPointer, gatewayScroll } from "@/animations/hero";
import { LEFT_PLANE, RIGHT_PLANE, SPARK_PATH } from "@/components/brand/GatewayMark";
import { useLenis } from "@/components/motion/SmoothScroll";
import { TransitionLink } from "@/components/transitions/TransitionLink";

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el.querySelectorAll("[data-reveal]"), { autoAlpha: 1 });
        return;
      }
      gatewayIntro(el);
      gatewayScroll(el);
      if (isFinePointer()) return gatewayPointer(el);
    },
    { scope: root },
  );

  const toWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("work");
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -40 });
    else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section ref={root} className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16 lg:pt-24">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
      <div
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_45%,black,transparent)]"
        aria-hidden
      />

      <div className="container-ap relative grid items-center gap-10 lg:grid-cols-12">
        {/* Gateway stage */}
        <div
          data-reveal="manual"
          data-gw-stage
          className="relative order-first mx-auto w-full max-w-[230px] [perspective:1200px] sm:max-w-[340px] lg:order-last lg:col-span-5 lg:max-w-none"
          aria-hidden
        >
          <div data-gw-scroll>
          <div data-gw-tilt className="relative [transform-style:preserve-3d]">
            <span
              data-gw-word
              className="t-micro absolute top-[6%] -left-2 text-[11px]! tracking-[0.32em]! text-fg-2 lg:-left-10"
            >
              Access
            </span>
            <span
              data-gw-word
              className="t-micro absolute -right-2 bottom-[10%] text-[11px]! tracking-[0.32em]! text-cyan lg:-right-6"
            >
              Knowledge
            </span>
            <svg viewBox="0 0 200 210" className="w-full overflow-visible">
              <defs>
                <linearGradient id="hero-l" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0b2a67" />
                  <stop offset="1" stopColor="#071530" />
                </linearGradient>
                <linearGradient id="hero-r" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1a78ff" />
                  <stop offset="1" stopColor="#0b4fd6" />
                </linearGradient>
                <radialGradient id="hero-light" cx="0.5" cy="0.45" r="0.5">
                  <stop offset="0" stopColor="#25c7ff" stopOpacity="0.9" />
                  <stop offset="0.35" stopColor="#086bff" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#086bff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse data-gw-light cx="100" cy="100" rx="60" ry="92" fill="url(#hero-light)" />
              <g stroke="#25c7ff" strokeWidth="1.2" strokeLinecap="round" fill="none">
                {[-4, -2.4, -1.2, 0, 1.2, 2.4, 4].map((k) => (
                  <path key={k} data-gw-path d={`M100 126L${100 + k * 22} 210`} strokeOpacity={0.9 - Math.abs(k) * 0.14} />
                ))}
                {[146, 170, 200].map((y, i) => (
                  <path key={y} data-gw-path d={`M${100 - (y - 126) * 1.1} ${y}H${100 + (y - 126) * 1.1}`} strokeOpacity={0.5 - i * 0.12} />
                ))}
              </g>
              <g data-gw-lwrap>
                <polygon data-gw-left points={LEFT_PLANE} transform="translate(-26 0)" fill="url(#hero-l)" stroke="rgba(255,255,255,0.06)" />
              </g>
              <g data-gw-rwrap>
                <polygon data-gw-right points={RIGHT_PLANE} transform="translate(26 0)" fill="url(#hero-r)" />
              </g>
              <path data-gw-spark d={SPARK_PATH} fill="#fff" style={{ filter: "drop-shadow(0 0 10px rgba(37,199,255,0.9))" }} />
            </svg>
          </div>
          </div>
        </div>

        {/* Copy */}
        <div data-hero-copy className="lg:col-span-7">
          <p data-reveal="manual" data-hero-fade className="t-micro flex items-center gap-3 text-cyan">
            <span aria-hidden className="h-px w-8 bg-cyan" />
            The Access Point
          </p>
          {/* CSS-only entrance keeps the LCP element paintable before hydration. */}
          <h1
            className="hero-rise mt-6 text-[clamp(2.6rem,6vw,6rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
          >
            We build digital experiences that move businesses forward.
          </h1>
          <p data-reveal="manual" data-hero-fade className="t-lead mt-8 max-w-xl text-fg-2">
            Websites, software, brands and digital experiences built where{" "}
            <strong className="font-semibold text-fg">technology meets creativity.</strong>
          </p>
          <div data-reveal="manual" data-hero-fade className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TransitionLink href="/contact" data-magnetic data-track="Hero Start a Project" className="btn btn-primary btn-lg">
              Start a Project <span className="arrow">→</span>
            </TransitionLink>
            <a href="#work" onClick={toWork} data-track="Hero Explore Work" className="btn btn-secondary btn-lg">
              Explore Our Work <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </div>

      <div className="t-micro absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-fg-3 lg:flex" aria-hidden>
        <span className="h-8 w-px bg-gradient-to-b from-transparent to-cyan" />
        Scroll
      </div>
    </section>
  );
}
