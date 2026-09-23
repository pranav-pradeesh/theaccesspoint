"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Switches between light and dark. The choice is saved; until then the system setting is used. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // The boot script in layout.tsx has already applied a theme; read it after hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the theme applied before hydration
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this page view.
    }
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? label : "Toggle colour theme"}
      title={theme ? label : undefined}
      className={`flex size-10 items-center justify-center rounded-md border border-line-strong text-fg-2 transition-colors hover:text-fg ${className}`}
    >
      {/* Both icons render server-side; CSS shows the right one before hydration. */}
      <svg viewBox="0 0 20 20" className="theme-icon-sun size-5" aria-hidden>
        <circle cx="10" cy="10" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <svg viewBox="0 0 20 20" className="theme-icon-moon size-5" aria-hidden>
        <path
          d="M16.5 12.3A7 7 0 0 1 7.7 3.5a7 7 0 1 0 8.8 8.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
