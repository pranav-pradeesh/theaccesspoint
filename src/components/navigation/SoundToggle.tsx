"use client";

import { useEffect, useRef, useState } from "react";
import { playClick, setSoundEnabled, soundEnabled } from "@/lib/sound";

const CLICKABLE = "a[href], button:not(:disabled), select, summary, [role='button']";

/** Header toggle for click sounds (off by default). While on, clicks on links and buttons tick. */
export function SoundToggle({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(false);
  const onRef = useRef(false);

  useEffect(() => {
    const saved = soundEnabled();
    onRef.current = saved;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the saved preference after hydration
    setOn(saved);

    const onClick = (e: MouseEvent) => {
      if (!onRef.current || !(e.target instanceof Element)) return;
      if (e.target.closest(CLICKABLE)) playClick();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const toggle = () => {
    const next = !on;
    onRef.current = next;
    setOn(next);
    setSoundEnabled(next);
    // The capture listener above has already run for this click, so confirm "on" explicitly.
    if (next) playClick();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label="Click sounds"
      title={on ? "Turn click sounds off" : "Turn click sounds on"}
      className={`flex size-10 items-center justify-center rounded-md border border-line-strong text-fg-2 transition-colors hover:text-fg ${className}`}
    >
      <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
        <path d="M3 8v4h3l4 3.5v-11L6 8H3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        {on ? (
          <path d="M13 7.5a3.5 3.5 0 0 1 0 5M15.2 5.3a6.6 6.6 0 0 1 0 9.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        ) : (
          <path d="M13.5 8l4 4M17.5 8l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
