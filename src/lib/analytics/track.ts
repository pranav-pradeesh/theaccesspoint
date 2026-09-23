/*
 * Privacy-conscious analytics: cookieless Plausible, enabled only when
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. No personal data is ever sent.
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Props }) => void) & { q?: unknown[] };
  }
}

export type AnalyticsEvent =
  | "CTA Click"
  | "Project Submitted"
  | "Case Study View"
  | "Service Interaction"
  | "Scroll Depth"
  | "Navigation";

export function track(event: AnalyticsEvent, props?: Props) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
