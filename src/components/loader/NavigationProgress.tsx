"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "loading" | "done";

/**
 * Thin top bar for in-app navigation. It starts when an internal link is clicked and completes
 * when the new route has actually rendered (pathname changes), never on a timer.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      clear();
      setPhase("loading");
      // Failsafe: never leave the bar hanging if navigation is abandoned.
      timers.current.push(window.setTimeout(() => setPhase("idle"), 10000));
    };
    // Capture phase: next/link calls preventDefault() on its own click handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (phase === "loading") setPhase("done");
  }

  useEffect(() => {
    if (phase !== "done") return;
    clear();
    timers.current.push(window.setTimeout(() => setPhase("idle"), 400));
    return clear;
  }, [phase]);

  return <div aria-hidden className="ap-navbar" data-phase={phase} />;
}
