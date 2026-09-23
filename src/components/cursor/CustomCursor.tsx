"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/animations/gsap";

type CursorState = "default" | "view" | "drag" | "open" | "link";

/**
 * Desktop-only cursor. Elements opt into states with `data-cursor="view|drag|open"`;
 * links and buttons get a subtle hover state automatically.
 * Never rendered on touch devices or with reduced motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability check must run on the client
    setEnabled(isFinePointer() && !prefersReducedMotion());
  }, []);

  // Reset label when the route changes (the hovered element is gone).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setState("default");
  }

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;
    document.documentElement.classList.add("has-custom-cursor");
    const dot = dotRef.current;
    const ring = ringRef.current;
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.set([dot, ring], { autoAlpha: 1 });
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) setState(labelled.dataset.cursor as CursorState);
      else if (target?.closest("a, button, [role=button], label, select")) setState("link");
      else setState("default");
    };
    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = state === "view" ? "View" : state === "drag" ? "Drag" : state === "open" ? "Open" : "";
  const big = label !== "";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={ringRef}
        className="invisible absolute top-0 left-0 opacity-0"
      >
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-[var(--ease-access)] ${
            big
              ? "size-22 border-transparent bg-electric text-white"
              : state === "link"
                ? "size-12 border-cyan/60 bg-cyan/5"
                : "size-9 border-white/25"
          }`}
        >
          <span className={`t-micro transition-opacity duration-200 ${big ? "opacity-100" : "opacity-0"}`}>{label}</span>
        </div>
      </div>
      <div ref={dotRef} className="invisible absolute top-0 left-0 opacity-0">
        <div className={`size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan transition-opacity ${big ? "opacity-0" : ""}`} />
      </div>
    </div>
  );
}
