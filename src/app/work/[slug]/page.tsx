import { notFound } from "next/navigation";
import Link from "next/link";
import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GalleryArt, ProjectCover } from "@/components/visuals/ProjectArt";
import { getNextProject, getProject, getProjects } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return buildMetadata({ title: `${project.name} — Case Study`, description: project.summary, path: `/work/${slug}` });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const next = await getNextProject(slug);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Industry", value: project.industry },
    { label: "Year", value: project.year },
    { label: "Status", value: project.status },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 lg:pt-44">
        <div className="container-ap">
          <div data-reveal>
            <SectionLabel>Case study</SectionLabel>
          </div>
          <h1 data-reveal className="t-h1 mt-8 max-w-[18ch]">
            {project.name}
          </h1>
          <p data-reveal className="t-lead mt-8 max-w-2xl text-fg-2">
            {project.summary}
          </p>
          <dl data-reveal="stagger" className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-line bg-line md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-obsidian p-5 lg:p-6">
                <dt className="t-micro text-fg-3">{m.label}</dt>
                <dd className="mt-2 font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="container-ap mt-10">
          <div data-reveal className="overflow-hidden rounded-[20px] border border-line">
            <div>
              <ProjectCover cover={project.cover} className="aspect-[4/3] w-full md:aspect-[21/9]" />
            </div>
          </div>
        </div>
      </section>

      {/* Story — editorial light theme */}
      <div className="theme-light mt-24 bg-paper text-ink">
        <div className="container-ap grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="t-micro text-ink-3">Services</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="t-micro mt-8 text-ink-3">Technology</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technology.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              <nav aria-label="Case study sections" className="mt-10 hidden lg:block">
                <ol className="space-y-2 border-l border-rule">
                  {project.sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-ink-2 hover:border-electric hover:text-ink">
                        <span className="font-mono text-xs text-ink-3">0{i + 1}</span> {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {project.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-rule py-14 first:border-t-0 first:pt-0">
                <div data-reveal>
                  <SectionLabel light index={`0${i + 1}`}>
                    {s.label}
                  </SectionLabel>
                </div>
                <h2 data-reveal className="t-h2 mt-6 text-ink">
                  {s.heading}
                </h2>
                <div data-reveal className="prose-ap mt-6">
                  <RichText blocks={s.body} />
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <section aria-labelledby="gallery-heading" className="border-t border-rule bg-paper-1 py-20 lg:py-28">
          <div className="container-ap">
            <SectionLabel light index="08">
              Gallery
            </SectionLabel>
            <h2 id="gallery-heading" className="t-h2 mt-6 text-ink">
              Inside the system
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {project.gallery.map((g) => (
                <figure key={g.caption} data-reveal className="group">
                  <div className="overflow-hidden rounded-[18px] border border-rule bg-paper p-6 transition-transform duration-700 ease-[var(--ease-access)] group-hover:-translate-y-1">
                    <div className="aspect-[4/3]">
                      <GalleryArt art={g.art} />
                    </div>
                  </div>
                  <figcaption className="t-micro mt-4 text-ink-3">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Next project */}
      {next && (
        <section className="section">
          <div className="container-ap">
            <Link href={`/work/${next.slug}`} className="group block">
              <SectionLabel index="09">Next project</SectionLabel>
              <div className="mt-8 flex items-end justify-between gap-6 border-b border-line pb-10">
                <p className="t-h1 transition-colors duration-300 group-hover:text-cyan">{next.name}</p>
                <span aria-hidden className="text-5xl transition-transform duration-500 ease-[var(--ease-access)] group-hover:translate-x-3">
                  →
                </span>
              </div>
              <p className="mt-6 max-w-xl text-fg-2">{next.summary}</p>
            </Link>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.name, path: `/work/${slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.summary,
            url: absoluteUrl(`/work/${slug}`),
            dateCreated: project.year,
            creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
            keywords: [...project.services, ...project.technology].join(", "),
          },
        ]}
      />
    </>
  );
}
