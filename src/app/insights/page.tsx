import { InsightsList } from "@/components/insights/InsightsList";
import { PageHero } from "@/components/ui/PageHero";
import { articleCategories, getArticles } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Insights",
  description: "Notes on web development, design, technology, business, education and digital strategy from The Access Point.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        label="Insights"
        title="Knowledge, shared openly."
        lead="What we're learning about building for the web, designing products and making technology easier to understand."
      />
      <section className="pb-24 lg:pb-32">
        <div className="container-ap" data-reveal>
          <InsightsList articles={articles} categories={articleCategories} />
        </div>
      </section>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
    </>
  );
}
