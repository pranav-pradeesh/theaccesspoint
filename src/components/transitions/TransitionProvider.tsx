"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { prefersReducedMotion, ScrollTrigger } from "@/animations/gsap";
import { gatewayClose, gatewayOpen } from "@/animations/pageTransition";
import { GatewayGlyph } from "@/components/brand/GatewayMark";
import { useLenis } from "@/components/motion/SmoothScroll";

type Navigate = (href: string) => void;
const TransitionContext = createContext<Navigate | null>(null);
export const useTransitionNavigate = () => useContext(TransitionContext);

/** Page A → gateway closes → route change → gateway opens → Page B. */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  const navigate = useCallback<Navigate>(
    (href) => {
      const overlay = overlayRef.current;
      if (!overlay || prefersReducedMotion() || pending.current) {
        router.push(href);
        return;
      }
      pending.current = true;
      gatewayClose(overlay).then(() => {
        router.push(href);
        // Safety net: never leave the gateway closed if the route doesn't change.
        window.setTimeout(() => {
          if (!pending.current) return;
          pending.current = false;
          gatewayOpen(overlay);
        }, 3000);
      });
    },
    [router],
  );

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    if (!pending.current || !overlayRef.current) return;
    pending.current = false;
    ScrollTrigger.refresh();
    gatewayOpen(overlayRef.current);
    // Move focus to the new page's main landmark for screen-reader users.
    document.getElementById("main")?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only on route change
  }, [pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex overflow-hidden"
        style={{ visibility: "hidden" }}
      >
        <div data-pt-left className="h-full w-1/2 bg-navy-deep" />
        <div
          data-pt-right
          className="h-full w-1/2"
          style={{ background: "linear-gradient(135deg, #0b2a67 0%, #086bff 100%)" }}
        />
        <div data-pt-spark className="absolute top-1/2 left-1/2 -mt-10 -ml-10 size-20 opacity-0">
          <GatewayGlyph />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
