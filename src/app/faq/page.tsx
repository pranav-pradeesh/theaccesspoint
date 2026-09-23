import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { getFaqs } from "@/lib/cms";
import { breadcrumbLd, faqLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about The Access Point, Coimbatore: our IT training courses, fees and admissions, certificates, and how we work on website, software and design projects.",
  path: "/faq",
});

export default async function FaqPage() {
  const groups = await getFaqs();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ];
  return (
    <>
      <PageHero
        above={<Breadcrumbs items={crumbs} />}
        label="FAQ"
        title="Frequently asked questions"
        lead="Answers to common questions about The Access Point, our training courses and our services. Each course and service page has its own questions too."
      />

      <div className="container-ap py-6 lg:py-10">
        {groups.map((g) => {
          const id = g.group.toLowerCase().replace(/[^a-z]+/g, "-");
          return (
            <section key={g.group} aria-labelledby={id} className="py-8">
              <h2 id={id} className="t-h2">
                {g.group}
              </h2>
              <div className="mt-6">
                <FaqList faqs={g.items} />
              </div>
            </section>
          );
        })}
      </div>

      <section className="border-t border-line bg-surface-1">
        <div className="container-ap flex flex-col gap-4 py-12 md:flex-row md:items-center md:justify-between">
          <p className="t-h3">
            Still have a question? Call{" "}
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

      <JsonLd data={[breadcrumbLd(crumbs), faqLd(groups.flatMap((g) => g.items))]} />
    </>
  );
}
