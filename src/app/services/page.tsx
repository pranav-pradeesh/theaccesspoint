import { ProcessSteps } from "@/components/home/ProcessSteps";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { getServices, processSteps } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Web development, software development, UI/UX design, branding, digital marketing and technical education from The Access Point.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        label="Services"
        title="Everything it takes to build, launch and grow."
        lead="Six disciplines under one roof — so strategy, design, engineering and knowledge move together instead of being handed off."
      >
        <nav aria-label="Services" className="mt-12" data-reveal>
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="btn btn-secondary h-10! px-4! text-sm!">
                  <span className="font-mono text-xs text-fg-3">{s.index}</span> {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-ap pb-12">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className="grid scroll-mt-28 gap-10 border-t border-line py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
          >
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-last lg:col-start-8" : ""}`}>
              <div data-reveal className="grid-lines relative aspect-[4/3] overflow-hidden rounded-[18px] border border-line bg-surface-1">
                <div className="absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
                <ServiceVisual kind={s.visual} className="absolute inset-0 size-full p-6" />
              </div>
            </div>
            <div className={`lg:col-span-6 ${i % 2 ? "lg:col-start-1" : "lg:col-start-7"}`}>
              <div data-reveal>
                <SectionLabel index={s.index}>{s.upcoming ? "Coming soon" : "Service"}</SectionLabel>
              </div>
              <h2 id={`${s.slug}-title`} data-reveal className="t-h1 mt-6">
                {s.title}
              </h2>
              <p data-reveal className="t-lead mt-6 text-fg-2">
                {s.description}
              </p>
              <div data-reveal className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="t-micro text-fg-3">What we do</h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.offerings.map((o) => (
                      <li key={o} className="flex items-center gap-3">
                        <span aria-hidden className="h-px w-3 bg-cyan" /> {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="t-micro text-fg-3">Typical deliverables</h3>
                  <ul className="mt-4 space-y-2.5 text-fg-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3">
                        <span aria-hidden className="h-px w-3 bg-fg-3" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ProcessSteps steps={processSteps} label="How we work" />
      <CtaBand title="Not sure which service you need?" lead="Tell us about the problem. We'll help you work out the right approach — even if it's smaller than you expected." />

      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...services.map((s) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.description,
            serviceType: s.title,
            url: absoluteUrl(`/services#${s.slug}`),
            provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          })),
        ]}
      />
    </>
  );
}
