"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Cookieless Plausible analytics (only when configured) plus delegated tracking:
 * - any element with `data-track="Label"` reports a CTA click
 * - scroll depth milestones per page (25/50/75/100%)
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!domain) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el) track("CTA Click", { label: el.dataset.track ?? "unknown", path: window.location.pathname });
      const nav = (e.target as Element | null)?.closest<HTMLAnchorElement>("header a, #mobile-menu a");
      if (nav) track("Navigation", { to: nav.getAttribute("href") ?? "", from: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!domain) return;
    const sent = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark - 1 && !sent.has(mark)) {
          sent.add(mark);
          track("Scroll Depth", { depth: mark, path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!domain) return null;
  return (
    <>
      <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
    </>
  );
}
