import Link from "next/link";
import { GatewayMark } from "@/components/brand/GatewayMark";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />

      <div className="container-ap relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="t-micro flex items-center gap-3 text-cyan">
            <span aria-hidden className="h-px w-8 bg-cyan" />
            The Access Point · Coimbatore
          </p>
          <h1 className="hero-rise mt-6 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
            We build digital experiences that move businesses forward.
          </h1>
          <p className="t-lead mt-6 max-w-xl text-fg-2">
            Websites, software, brands and digital marketing — planned carefully, built properly and supported after
            launch.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Start a Project <span className="arrow">→</span>
            </Link>
            <Link href="/work" className="btn btn-secondary btn-lg">
              Explore Our Work
            </Link>
          </div>
        </div>

        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block" aria-hidden>
          <div className="relative flex aspect-square items-center justify-center rounded-[20px] border border-line bg-surface-1">
            <GatewayMark split={18} className="h-[58%] w-auto overflow-visible" />
          </div>
        </div>
      </div>
    </section>
  );
}
