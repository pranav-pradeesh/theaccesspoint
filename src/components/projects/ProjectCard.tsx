import Link from "next/link";
import { ProjectCover } from "@/components/visuals/ProjectArt";
import type { Project } from "@/lib/cms/types";

export function ProjectCard({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  return (
    <article data-reveal className="group">
      <Link href={`/work/${project.slug}`} className="block" aria-label={`${project.name} — view case study`}>
        <div className="relative overflow-hidden rounded-[18px] border border-line">
          <div>
            <ProjectCover
              cover={project.cover}
              className={`w-full transition-transform duration-500 ease-[var(--ease-access)] group-hover:scale-[1.02] ${
                large ? "aspect-[4/3] lg:aspect-[16/8]" : "aspect-[4/3]"
              }`}
            />
          </div>
          <span className="tag absolute top-5 left-5 border-white/15 bg-obsidian/70 backdrop-blur">{project.status}</span>
          <span className="t-micro absolute top-6 right-6 text-fg-2">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="t-micro text-fg-3">
              {project.client} · {project.industry} · {project.year}
            </p>
            <h3 className="t-h3 mt-2 transition-colors group-hover:text-cyan">{project.name}</h3>
            <p className="mt-3 max-w-xl text-fg-2">{project.summary}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Services">
              {project.services.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
            <p className="t-micro text-fg-3" aria-label="Technology">
              {project.technology.join(" / ")}
            </p>
            <span className="link-cta text-fg">
              View Case Study <span className="arrow">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
