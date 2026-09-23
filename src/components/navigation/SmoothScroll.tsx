"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Smooth wheel scrolling with Lenis. Touch devices keep native scrolling, and Lenis turns itself
 * off for visitors who ask for reduced motion. In-page links (#…) use the browser's own jump so
 * keyboard focus and the course enquiry preselection keep working.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.12, stopInertiaOnNavigate: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
