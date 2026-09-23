"use client";

import { gsap } from "./gsap";

/** Fade + rise into view. Elements start hidden via `html.js [data-reveal]` CSS. */
export function reveal(el: Element, { delay = 0, y = 28 }: { delay?: number; y?: number } = {}) {
  return gsap.fromTo(
    el,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      delay,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    },
  );
}

/** Reveal direct children one after another (0.06s stagger per the motion spec). */
export function staggerReveal(el: Element, { y = 24 }: { y?: number } = {}) {
  gsap.set(el, { autoAlpha: 1 });
  return gsap.fromTo(
    el.children,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    },
  );
}

/** Words light up one by one as the statement scrolls through the viewport. */
export function textReveal(el: Element) {
  gsap.set(el, { autoAlpha: 1 });
  const words = el.querySelectorAll("[data-word]");
  return gsap.fromTo(
    words,
    // Dim state still clears 3:1 for large text; the cyan highlight needs a higher floor.
    { opacity: (_: number, w: Element) => (w.classList.contains("text-cyan") ? 0.6 : 0.4) },
    {
      opacity: 1,
      ease: "none",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
    },
  );
}

/** Vertical parallax. `speed` is a fraction of element height (e.g. 0.12). */
export function parallax(el: Element, speed = 0.12) {
  return gsap.fromTo(
    el,
    { yPercent: -speed * 100 },
    {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}
