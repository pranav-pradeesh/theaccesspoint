import { GatewayMark } from "@/components/brand/GatewayMark";
import { Illustration } from "@/components/illustrations/Illustration";
import { siteConfig } from "@/lib/site";

/** Home hero image: the brand mark on a navy panel, with the two sides of the business beneath it. */
export function HeroVisual() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div
        className="relative col-span-2 flex items-center gap-6 overflow-hidden rounded-xl p-7 text-white sm:p-8"
        style={{ background: "linear-gradient(135deg, #0b2a67 0%, #071530 70%)", "--mark-spark": "#ffffff" } as React.CSSProperties}
      >
        <div aria-hidden className="absolute -top-16 -right-16 size-56 rounded-full bg-[#25c7ff] opacity-20 blur-3xl" />
        <div className="relative shrink-0 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
          <GatewayMark className="il-float w-20 overflow-visible sm:w-24" />
        </div>
        <div className="relative">
          <p className="text-xl font-bold tracking-[-0.01em] sm:text-2xl">{siteConfig.name}</p>
          <p className="mt-1 text-[#a3c4ff]">{siteConfig.descriptor}</p>
          <p className="mt-4 text-sm text-white/70">IT services and training, {siteConfig.address.locality}</p>
        </div>
      </div>
      <figure className="overflow-hidden rounded-xl border border-line">
        <Illustration name="web" />
        <figcaption className="border-t border-line px-4 py-2.5 text-sm font-semibold">For businesses</figcaption>
      </figure>
      <figure className="overflow-hidden rounded-xl border border-line">
        <Illustration name="code" />
        <figcaption className="border-t border-line px-4 py-2.5 text-sm font-semibold">For learners</figcaption>
      </figure>
    </div>
  );
}
