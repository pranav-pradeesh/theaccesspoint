import { LEFT_PLANE, RIGHT_PLANE, SPARK_PATH } from "@/components/brand/GatewayMark";
import { loaderScript } from "./loaderScript";

/**
 * First-load loader. The markup is server-rendered (hidden unless JS is available) and the inline
 * script right after it drives progress before React hydrates. Nodes the script mutates carry
 * suppressHydrationWarning, and the loader is hidden (never removed) so hydration stays clean.
 */
export function PageLoader() {
  return (
    <>
      <div
        id="ap-loader"
        role="progressbar"
        aria-label="Loading The Access Point"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        suppressHydrationWarning
      >
        <div className="apl-inner">
          <svg viewBox="14 12 172 180" width="56" height="58" aria-hidden>
            <g stroke="#25c7ff" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M100 124L80 186M100 124L120 186" />
            </g>
            <polygon className="apl-l" points={LEFT_PLANE} fill="#0b2a67" />
            <polygon className="apl-r" points={RIGHT_PLANE} fill="#086bff" />
            <path d={SPARK_PATH} fill="#fff" />
          </svg>
          <p className="apl-name">The Access Point</p>
          <div className="apl-bar">
            <span suppressHydrationWarning />
          </div>
          <p className="apl-pct">
            <span suppressHydrationWarning>0</span>%
          </p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
    </>
  );
}
