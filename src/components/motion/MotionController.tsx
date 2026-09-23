"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, isFinePointer, prefersReducedMotion, ScrollTrigger } from "@/animations/gsap";
import { magnetic } from "@/animations/interactions";
import { parallax, reveal, staggerReveal, textReveal } from "@/animations/scroll";

/**
 * Wires declarative motion attributes on every route, so sections can stay
 * server components with zero client JavaScript of their own:
 *   data-reveal            fade + rise   (data-reveal="stagger" for children)
 *   data-reveal-delay="0.1"
 *   data-split             word-by-word scrubbed statement (words marked data-word)
 *   data-parallax="0.12"   vertical parallax
 *   data-magnetic          magnetic pull on fine pointers
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-reveal]", { autoAlpha: 1 });
        return;
      }
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.reveal === "stagger") staggerReveal(el);
        else if (el.dataset.reveal === "manual") return;
        else reveal(el, { delay: Number(el.dataset.revealDelay ?? 0) });
      });
      document.querySelectorAll("[data-split]").forEach((el) => textReveal(el));
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        parallax(el, Number(el.dataset.parallax) || 0.12);
      });
    });

    if (!reduced && isFinePointer()) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => cleanups.push(magnetic(el)));
    }

    // ScrollTrigger already refreshes on window load; fonts can land later and shift layout.
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
