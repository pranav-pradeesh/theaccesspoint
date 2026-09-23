"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/animations/gsap";
import { reveal, staggerReveal } from "@/animations/scroll";

/**
 * Subtle entrance fades, wired on every route so sections can stay server components:
 *   data-reveal            fade + rise   (data-reveal="stagger" for children)
 *   data-reveal-delay="0.1"
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-reveal]", { autoAlpha: 1 });
        return;
      }
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.reveal === "stagger") staggerReveal(el);
        else reveal(el, { delay: Number(el.dataset.revealDelay ?? 0) });
      });
    });

    // ScrollTrigger already refreshes on window load; fonts can land later and shift layout.
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
