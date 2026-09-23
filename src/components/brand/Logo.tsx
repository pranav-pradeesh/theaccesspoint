"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { GatewayMark } from "./GatewayMark";

/** Logo lockup. Easter egg: hovering the mark briefly opens the gateway wider. */
export function Logo({ compact = false }: { compact?: boolean }) {
  const markRef = useRef<HTMLSpanElement>(null);

  const pulse = (open: boolean) => {
    const el = markRef.current;
    if (!el || prefersReducedMotion()) return;
    // Polygons carry a resting translate; offset from it rather than replacing it.
    el.querySelectorAll<SVGPolygonElement>("polygon").forEach((poly, i) => {
      poly.dataset.x ??= String(gsap.getProperty(poly, "x"));
      const dir = i === 0 ? -1 : 1;
      gsap.to(poly, { x: Number(poly.dataset.x) + (open ? dir * 6 : 0), duration: 0.6, ease: "expo.out" });
    });
  };

  return (
    <TransitionLink
      href="/"
      className="group flex items-center gap-3"
      onPointerEnter={() => pulse(true)}
      onPointerLeave={() => pulse(false)}
    >
      <span ref={markRef} className="block size-9 shrink-0">
        <GatewayMark className="size-full overflow-visible" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-[-0.02em] text-fg">THE ACCESS POINT</span>
        <span
          className={`t-micro mt-1 text-[10px]! text-fg-2 transition-all duration-300 ${compact ? "max-h-0 opacity-0" : "max-h-4 opacity-100"}`}
        >
          Gateway to Knowledge
        </span>
        <span className="sr-only"> — home</span>
      </span>
    </TransitionLink>
  );
}
