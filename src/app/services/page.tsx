import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getServices, serviceHref } from "@/lib/cms";
import { breadcrumbLd, itemListLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Web development and hosting, software and mobile apps, UI/UX design, branding, digital marketing and technical training from The Access Point, Coimbatore.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        label="Services"
        title="Our services"
        lead="We work with businesses, institutions and individuals on websites, software, design and marketing, and we run technical training courses."
      />

      <div className="container-ap py-6 lg:py-10">
        {services.map((s) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className="grid scroll-mt-24 gap-4 border-b border-line py-10 last:border-b-0 md:grid-cols-[1fr_1.4fr] md:gap-12"
          >
            <h2 id={`${s.slug}-title`} className="t-h2">
              {s.title}
            </h2>
            <div>
              <p className="text-lg text-fg-2">{s.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${s.title} includes`}>
                {s.offerings.map((o) => (
                  <li key={o} className="tag">
                    {o}
                  </li>
                ))}
              </ul>
              <Link href={serviceHref(s)} className="btn btn-secondary mt-6">
                {s.href ? "View courses" : `More about ${s.title.toLowerCase()}`}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-line bg-surface-1">
        <div className="container-ap flex flex-col gap-4 py-12 md:flex-row md:items-center md:justify-between">
          <p className="t-h3">Tell us what you need and we&apos;ll suggest the right approach.</p>
          <Link href="/contact" className="btn btn-primary">
            Discuss a project
          </Link>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          itemListLd("Services", services.map((s) => ({ name: s.title, path: serviceHref(s) }))),
        ]}
      />
    </>
  );
}
