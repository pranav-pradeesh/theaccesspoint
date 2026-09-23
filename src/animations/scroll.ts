"use client";

import { gsap } from "./gsap";

/** Short fade + rise into view. Elements start hidden via `html.js [data-reveal]` CSS. */
export function reveal(el: Element, { delay = 0 }: { delay?: number } = {}) {
  return gsap.fromTo(
    el,
    { autoAlpha: 0, y: 16 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      delay,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    },
  );
}

/** Reveal direct children one after another. */
export function staggerReveal(el: Element) {
  gsap.set(el, { autoAlpha: 1 });
  return gsap.fromTo(
    el.children,
    { autoAlpha: 0, y: 12 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    },
  );
}
