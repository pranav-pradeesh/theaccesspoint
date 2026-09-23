"use client";

import { gsap } from "./gsap";

// ~400ms close + ~500ms open keeps the full transition within the 400–800ms target per phase.
export function gatewayClose(overlay: HTMLElement) {
  const q = gsap.utils.selector(overlay);
  gsap.set(overlay, { visibility: "visible" });
  return gsap
    .timeline()
    .fromTo(q("[data-pt-left]"), { xPercent: -100 }, { xPercent: 0, duration: 0.42, ease: "power3.inOut" }, 0)
    .fromTo(q("[data-pt-right]"), { xPercent: 100 }, { xPercent: 0, duration: 0.42, ease: "power3.inOut" }, 0)
    .fromTo(q("[data-pt-spark]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0.24);
}

export function gatewayOpen(overlay: HTMLElement) {
  const q = gsap.utils.selector(overlay);
  return gsap
    .timeline({ onComplete: () => void gsap.set(overlay, { visibility: "hidden" }) })
    .to(q("[data-pt-spark]"), { scale: 1.6, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
    .to(q("[data-pt-left]"), { xPercent: -100, duration: 0.55, ease: "expo.inOut" }, 0.1)
    .to(q("[data-pt-right]"), { xPercent: 100, duration: 0.55, ease: "expo.inOut" }, 0.1);
}
