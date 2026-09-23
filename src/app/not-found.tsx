import { GatewayMark } from "@/components/brand/GatewayMark";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
      <div className="container-ap relative flex flex-col items-center text-center">
        <GatewayMark split={0} className="h-32 w-auto opacity-80" />
        <p className="t-micro mt-10 text-cyan">Error 404</p>
        <h1 className="t-h1 mt-6 max-w-[16ch]">Page not found</h1>
        <p className="t-lead mt-6 max-w-lg text-fg-2">The page you are looking for may have moved, or the link may be incorrect.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary btn-lg">
            Back to home <span className="arrow">→</span>
          </Link>
          <Link href="/work" className="btn btn-secondary btn-lg">
            Explore Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
