import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getServices, mission, values } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "The Access Point is a Coimbatore company offering IT services for businesses and practical technical training courses.",
  path: "/about",
});

export default async function AboutPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        label="About us"
        title="The Access Point: Gateway to Knowledge"
        lead="We are a Coimbatore company that provides IT services to businesses and technical training to students and professionals."
      />

      <section className="section" aria-labelledby="what-heading">
        <div className="container-ap grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 id="what-heading" className="t-h2">
            What we do
          </h2>
          <div>
            <p className="text-lg text-fg-2">
              For businesses, we build websites and web applications, develop software and mobile apps, design brands and
              run digital marketing. For learners, we run classroom courses in programming, web and mobile development,
              animation, hardware and networking, and cloud computing.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug} className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-cyan" />
                  {s.title}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/services" className="btn btn-secondary">
                Our services
              </Link>
              <Link href="/training" className="btn btn-secondary">
                Training courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-surface-1" aria-labelledby="values-heading">
        <div className="container-ap">
          <h2 id="values-heading" className="t-h2">
            Our values
          </h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <dt className="t-h3">{v.title}</dt>
                <dd className="mt-2 text-fg-2">{v.line}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="mission-heading">
        <div className="container-ap grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 id="mission-heading" className="t-h2">
            Our mission
          </h2>
          <dl className="divide-y divide-line border-y border-line">
            {mission.map((m) => (
              <div key={m.verb} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-semibold">{m.verb}</dt>
                <dd className="text-fg-2">{m.line}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line bg-surface-1">
        <div className="container-ap flex flex-col gap-4 py-12 md:flex-row md:items-center md:justify-between">
          <p className="t-h3">
            Visit us in Coimbatore or call{" "}
            <a href={siteConfig.phone.href} className="link">
              {siteConfig.phone.display}
            </a>
            .
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact us
          </Link>
        </div>
      </section>

      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
