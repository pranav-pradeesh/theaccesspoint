import { ProjectCard } from "@/components/projects/ProjectCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { getProjects } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Work",
  description: "Case studies from The Access Point — the problem, strategy, design, development and result behind each project.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        label="Work"
        title="Selected work"
        lead="Digital experiences built for ambitious people and businesses. Every project is told as a case study: problem, strategy, design, development and result."
      />
      <section className="pb-24 lg:pb-32">
        <div className="container-ap grid gap-20 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-24">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <CtaBand title="Your project could be next." />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
    </>
  );
}
