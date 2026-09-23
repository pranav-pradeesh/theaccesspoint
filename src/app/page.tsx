import { HomeHero } from "@/components/hero/HomeHero";
import { AccessNetwork } from "@/components/home/AccessNetwork";
import { ProcessScroll } from "@/components/home/ProcessScroll";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitStatement } from "@/components/ui/SplitStatement";
import { getProjects, getServices, pillars, processSteps } from "@/lib/cms";

export default async function HomePage() {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);

  return (
    <>
      <HomeHero />

      {/* 01 — Brand statement */}
      <section className="section">
        <div className="container-ap">
          <div data-reveal>
            <SectionLabel index="01">Belief</SectionLabel>
          </div>
          <SplitStatement
            as="h2"
            className="mt-10 max-w-[22ch] text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-bold tracking-[-0.03em]"
            text="Technology should not be complicated. Great digital experiences make it feel effortless."
            highlight={["effortless"]}
          />
        </div>
      </section>

      {/* 02 — Services */}
      <section className="section pt-0!" aria-labelledby="services-heading">
        <div className="container-ap">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div data-reveal>
                <SectionLabel index="02">Services</SectionLabel>
              </div>
              <h2 id="services-heading" data-reveal className="t-h1 mt-6 max-w-[16ch]">
                What we build — and how it helps.
              </h2>
            </div>
            <TransitionLink href="/services" data-reveal className="link-cta">
              All services <span className="arrow">→</span>
            </TransitionLink>
          </div>
          <ServicesExplorer services={services} />
        </div>
      </section>

      {/* 03 — Selected work */}
      <section id="work" className="section scroll-mt-20" aria-labelledby="work-heading">
        <div className="container-ap">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div data-reveal>
                <SectionLabel index="03">Work</SectionLabel>
              </div>
              <h2 id="work-heading" data-reveal className="t-h1 mt-6">
                Selected work
              </h2>
              <p data-reveal className="t-lead mt-5 max-w-xl text-fg-2">
                Digital experiences built for ambitious people and businesses.
              </p>
            </div>
            <TransitionLink href="/work" data-reveal className="link-cta">
              All work <span className="arrow">→</span>
            </TransitionLink>
          </div>
          <div className="grid gap-20">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} large />
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Access philosophy */}
      <section className="section relative overflow-hidden" aria-labelledby="access-heading">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
        <div className="container-ap relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div data-reveal>
              <SectionLabel index="04">Philosophy</SectionLabel>
            </div>
            <h2 id="access-heading" data-reveal className="t-h1 mt-6">
              Access should never be the barrier.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-fg-2">
              We sit at the point where these ideas meet. Every project we take on — a website, a product, a workshop —
              is a way of opening one of these doors a little wider.
            </p>
          </div>
          <div className="lg:col-span-7">
            <AccessNetwork />
          </div>
        </div>
      </section>

      {/* 05 — Process */}
      <ProcessScroll steps={processSteps} />

      {/* 06 — Why work with us */}
      <section className="section" aria-labelledby="why-heading">
        <div className="container-ap">
          <div data-reveal>
            <SectionLabel index="06">Why us</SectionLabel>
          </div>
          <h2 id="why-heading" data-reveal className="t-h1 mt-6 max-w-[18ch]">
            How we work with you.
          </h2>
          <ul data-reveal="stagger" className="mt-14 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p, i) => (
              <li key={p.title} className="flex flex-col bg-obsidian p-7 transition-colors duration-300 hover:bg-surface-2">
                <span className="t-micro text-fg-3">0{i + 1}</span>
                <h3 className="t-h4 mt-10">{p.title}</h3>
                <p className="mt-3 text-[15px] text-fg-2">{p.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
