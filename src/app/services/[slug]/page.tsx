import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { getService, getServices, serviceHref } from "@/lib/cms";
import { breadcrumbLd, faqLd, JsonLd, serviceLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

// Training has its own section at /training.
const hasOwnPage = (s: { href?: string }) => !s.href;

export async function generateStaticParams() {
  const services = await getServices();
  return services.filter(hasOwnPage).map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const service = await getService((await params).slug);
  if (!service) return {};
  return buildMetadata({ title: service.seoTitle, description: service.metaDescription, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getService(slug), getServices()]);
  if (!service || !hasOwnPage(service)) notFound();

  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero above={<Breadcrumbs items={crumbs} />} label={service.title} title={service.seoTitle} lead={service.description}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn btn-primary">
            Discuss your project
          </Link>
          <a href={siteConfig.phone.href} className="btn btn-secondary">
            Call {siteConfig.phone.display}
          </a>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="offer-heading">
        <div className="container-ap">
          <h2 id="offer-heading" className="t-h2">
            What we offer
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d) => (
              <li key={d.title} className="card p-6">
                <h3 className="t-h3">{d.title}</h3>
                <p className="mt-2 text-fg-2">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-y border-line bg-surface-1" aria-labelledby="audience-heading">
        <div className="container-ap grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 id="audience-heading" className="t-h2">
            Who it&apos;s for
          </h2>
          <ul className="space-y-3">
            {service.audience.map((a) => (
              <li key={a} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-lg text-fg-2">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="process-heading">
        <div className="container-ap grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 id="process-heading" className="t-h2">
            How we work
          </h2>
          <ol className="divide-y divide-line border-y border-line">
            {process.map((p, i) => (
              <li key={p.title} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <span className="font-semibold">
                  {i + 1}. {p.title}
                </span>
                <span className="text-fg-2">{p.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="faq-heading">
        <div className="container-ap">
          <h2 id="faq-heading" className="t-h2">
            {service.title}: frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-surface-1" aria-labelledby="related-heading">
        <div className="container-ap">
          <h2 id="related-heading" className="t-h2">
            Other services
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={serviceHref(s)} className="card block h-full bg-canvas p-6 transition-colors hover:border-line-strong">
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="mt-2 text-fg-2">{s.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd data={[breadcrumbLd(crumbs), serviceLd(service, path), faqLd(service.faqs)]} />
    </>
  );
}

const process = [
  { title: "Understand", text: "We talk through your goals, users and requirements, and look at anything you already have." },
  { title: "Propose", text: "You receive a written proposal with the scope, timeline and a quote before work starts." },
  { title: "Design and build", text: "We design and build in stages and share progress, so you can give feedback early." },
  { title: "Launch", text: "We test on real devices, launch, and hand over everything you need." },
  { title: "Support", text: "We stay available for updates, fixes and improvements after launch." },
];
