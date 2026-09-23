import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaBand } from "@/components/ui/CtaBand";
import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getArticle, getArticles } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const more = (await getArticles()).filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden pt-36 pb-16 lg:pt-48 lg:pb-24">
          <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
          <div className="container-ap relative max-w-5xl!">
            <div data-reveal>
              <Link href="/insights" className="t-micro text-fg-2 hover:text-cyan">
                ← Insights
              </Link>
            </div>
            <div data-reveal className="mt-10">
              <SectionLabel>{article.category}</SectionLabel>
            </div>
            <h1 data-reveal className="t-h1 mt-6">
              {article.title}
            </h1>
            <p data-reveal className="t-lead mt-6 text-fg-2">
              {article.excerpt}
            </p>
            <p data-reveal className="t-micro mt-10 flex flex-wrap gap-x-6 gap-y-2 text-fg-3">
              <span>{article.author}</span>
              <time dateTime={article.publishedAt}>{dateFmt.format(new Date(article.publishedAt))}</time>
              <span>{article.readingMinutes} min read</span>
            </p>
          </div>
        </header>

        <div className="theme-light bg-paper py-16 text-ink lg:py-24">
          <div className="container-ap max-w-3xl!">
            <div className="prose-ap">
              <RichText blocks={article.body} />
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section" aria-labelledby="more-heading">
          <div className="container-ap">
            <SectionLabel>Keep reading</SectionLabel>
            <h2 id="more-heading" className="sr-only">
              More insights
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {more.map((a) => (
                <li key={a.slug}>
                  <Link href={`/insights/${a.slug}`} className="card-gateway block h-full p-8">
                    <p className="t-micro text-cyan">{a.category}</p>
                    <h3 className="t-h3 mt-4">{a.title}</h3>
                    <p className="mt-3 text-fg-2">{a.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />

      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path: `/insights/${slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            articleSection: article.category,
            url: absoluteUrl(`/insights/${slug}`),
            mainEntityOfPage: absoluteUrl(`/insights/${slug}`),
            image: absoluteUrl(`/insights/${slug}/opengraph-image`),
            author: { "@type": "Organization", name: article.author, url: siteConfig.url },
            publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
          },
        ]}
      />
    </>
  );
}
