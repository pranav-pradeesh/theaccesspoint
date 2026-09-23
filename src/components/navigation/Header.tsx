"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useLenis } from "@/components/motion/SmoothScroll";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { primaryNav, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const toggle = toggleRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !menuRef.current) return;
      // Keep focus inside the menu + its toggle.
      const items = [toggle, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      toggle?.focus();
    };
  }, [open, lenis]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-electric px-4 py-2 font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`container-ap transition-[padding] duration-500 ease-[var(--ease-access)] ${compact ? "pt-3" : "pt-5 lg:pt-7"}`}
        >
          <div
            className={`flex items-center justify-between rounded-full border transition-all duration-500 ease-[var(--ease-access)] ${
              compact || open
                ? "border-line bg-[rgb(8_14_26/0.72)] py-2 pr-2 pl-4 backdrop-blur-xl"
                : "border-transparent bg-transparent py-2 pr-0 pl-0"
            }`}
          >
            <Logo compact={compact} />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="link-underline relative py-1 text-[15px] font-medium text-fg-2 transition-colors hover:text-fg aria-[current=page]:text-fg"
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <TransitionLink
                href="/contact"
                data-magnetic
                data-track="Start a Project"
                className={`btn btn-primary hidden sm:inline-flex ${compact ? "h-11!" : ""}`}
              >
                Start a Project <span className="arrow">→</span>
              </TransitionLink>
              <button
                ref={toggleRef}
                type="button"
                className="relative flex size-11 items-center justify-center rounded-full border border-line-strong lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span
                  className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
                />
                <span
                  className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: fullscreen menu with its own thumb-first layout */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col bg-obsidian pt-28 lg:hidden"
      >
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <nav aria-label="Mobile" className="container-ap relative flex-1">
          <ul className="border-t border-line">
            {[...primaryNav, { href: "/contact", label: "Contact" }].map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <TransitionLink
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline justify-between py-5 text-4xl font-bold tracking-tight aria-[current=page]:text-cyan"
                >
                  {item.label}
                  <span className="t-micro text-fg-3">0{i + 1}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-ap relative pb-10">
          <TransitionLink href="/contact" className="btn btn-primary btn-lg w-full">
            Start a Project <span className="arrow">→</span>
          </TransitionLink>
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-fg-2">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
          </div>
        </div>
      </div>
    </>
  );
}
