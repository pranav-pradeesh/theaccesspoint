"use client";

import { gsap } from "./gsap";

/**
 * Gateway choreography (Design System §7):
 * closed silhouette → planes split → pathway draws forward → spark ignites → words appear.
 */
export function gatewayIntro(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  tl.set(q("[data-hero-fade]"), { autoAlpha: 0, y: 24 })
    .set(q("[data-gw-left]"), { x: 0 })
    .set(q("[data-gw-right]"), { x: 0 })
    .set(q("[data-gw-stage]"), { autoAlpha: 1 })
    .set(q("[data-gw-spark]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%" })
    .set(q("[data-gw-light]"), { opacity: 0 })
    .set(q("[data-gw-word]"), { autoAlpha: 0, letterSpacing: "0.6em" })
    .set(q("[data-gw-path]"), { strokeDashoffset: (_: number, el: SVGPathElement) => el.getTotalLength?.() ?? 400 })
    .to(q("[data-hero-fade]"), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.1)
    .to(q("[data-gw-left]"), { x: -26, duration: 1.4 }, 0.35)
    .to(q("[data-gw-right]"), { x: 26, duration: 1.4 }, 0.35)
    .to(q("[data-gw-light]"), { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.45)
    .to(q("[data-gw-path]"), { strokeDashoffset: 0, duration: 1.6, stagger: 0.05, ease: "power3.inOut" }, 0.5)
    .to(q("[data-gw-spark]"), { scale: 1, opacity: 1, duration: 1.1, ease: "back.out(2)" }, 0.9)
    .to(q("[data-gw-word]"), { autoAlpha: 1, letterSpacing: "0.32em", duration: 1.4, stagger: 0.25 }, 1.05);

  return tl;
}

/**
 * Scroll: the visitor moves *through* the gateway.
 * Animates wrapper elements only, so it never fights the intro timeline.
 */
export function gatewayScroll(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  return gsap
    .timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
    })
    .fromTo(q("[data-gw-scroll]"), { scale: 1, yPercent: 0 }, { scale: 1.9, yPercent: 14, ease: "none" }, 0)
    .fromTo(q("[data-gw-lwrap]"), { x: 0 }, { x: -44, ease: "none" }, 0)
    .fromTo(q("[data-gw-rwrap]"), { x: 0 }, { x: 44, ease: "none" }, 0)
    .fromTo(q("[data-hero-copy]"), { yPercent: 0, autoAlpha: 1 }, { yPercent: -18, autoAlpha: 0, ease: "none" }, 0)
    .fromTo(q("[data-gw-scroll]"), { autoAlpha: 1 }, { autoAlpha: 0, ease: "none", duration: 0.45 }, 0.55);
}

/** Pointer + scroll-velocity response: the gateway leans toward the cursor. */
export function gatewayPointer(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>("[data-gw-tilt]");
  if (!stage) return () => {};
  const rx = gsap.quickTo(stage, "rotateX", { duration: 0.9, ease: "power3.out" });
  const ry = gsap.quickTo(stage, "rotateY", { duration: 0.9, ease: "power3.out" });
  const onMove = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    ry(nx * 14);
    rx(-ny * 10);
  };
  window.addEventListener("pointermove", onMove);
  return () => window.removeEventListener("pointermove", onMove);
}
