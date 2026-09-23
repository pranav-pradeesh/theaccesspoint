import { AccessNetwork } from "@/components/home/AccessNetwork";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitStatement } from "@/components/ui/SplitStatement";
import { getServices, mission, philosophy, pillars } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "The Access Point is a technology, design and knowledge company. We believe technology should open doors — for businesses and for learners.",
  path: "/about",
});

export default async function AboutPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        label="About"
        title="We believe technology should open doors."
        lead="The Access Point sits between businesses, people and technology — building the digital products organisations need, and sharing the knowledge that helps people understand them."
      />

      {/* Story */}
      <section className="section pt-8!" aria-labelledby="story-heading">
        <div className="container-ap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div data-reveal>
              <SectionLabel index="01">Our story</SectionLabel>
            </div>
            <h2 id="story-heading" data-reveal className="t-h2 mt-6">
              A studio with a teacher&apos;s instinct.
            </h2>
          </div>
          <div data-reveal="stagger" className="space-y-6 text-lg leading-relaxed text-fg-2 lg:col-span-7 lg:col-start-6">
            <p>
              The Access Point began with a simple conviction: technology is only as useful as it is accessible. Too many
              businesses are handed websites they can&apos;t manage and software they don&apos;t understand. Too many
              people are told technology isn&apos;t for them.
            </p>
            <p>
              So we do two things. We design and build digital products — websites, software and brands — that feel
              effortless to use. And we explain what we do, openly, so our clients and learners come away more capable
              than when they started.
            </p>
            <p>
              That&apos;s the idea behind the name. We want to be the access point: the place where people and
              businesses step through to better technology and better understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section bg-surface-1" aria-labelledby="philosophy-heading">
        <div className="container-ap">
          <div data-reveal>
            <SectionLabel index="02">Philosophy</SectionLabel>
          </div>
          <h2 id="philosophy-heading" data-reveal className="t-h1 mt-6 max-w-[16ch]">
            What we will and won&apos;t compromise on.
          </h2>
          <ol className="mt-16 border-t border-line">
            {philosophy.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                className="group grid gap-3 border-b border-line py-8 transition-colors duration-500 hover:bg-surface-2/60 md:grid-cols-12 md:items-baseline md:gap-6 lg:py-10"
              >
                <span className="t-micro text-fg-3 md:col-span-1">0{i + 1}</span>
                <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-bold tracking-[-0.03em] transition-colors duration-500 group-hover:text-cyan md:col-span-4">
                  {p.title}
                </h3>
                <p className="t-lead text-fg-2 md:col-span-7">&ldquo;{p.line}&rdquo;</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision */}
      <section className="section relative overflow-hidden" aria-labelledby="vision-heading">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
        <div className="container-ap relative">
          <div data-reveal>
            <SectionLabel index="03">Vision</SectionLabel>
          </div>
          <h2 id="vision-heading" className="sr-only">
            Vision
          </h2>
          <SplitStatement
            className="t-display mt-10 max-w-[12ch]"
            text="Learning should feel human."
            highlight={["human"]}
          />
          <p data-reveal className="t-lead mt-10 max-w-2xl text-fg-2">
            We believe technical education works best when curiosity replaces pressure and understanding comes before
            memorization.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section pt-0!" aria-labelledby="mission-heading">
        <div className="container-ap">
          <div data-reveal>
            <SectionLabel index="04">Mission</SectionLabel>
          </div>
          <h2 id="mission-heading" data-reveal className="t-h2 mt-6">
            Five verbs we work by.
          </h2>
          <ul data-reveal="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {mission.map((m, i) => (
              <li key={m.verb} className="card-gateway flex min-h-[220px] flex-col p-6">
                <span className="t-micro text-fg-3">0{i + 1}</span>
                <p className="mt-auto text-3xl font-extrabold tracking-[-0.03em]">
                  {m.verb}
                  <span className="text-cyan">.</span>
                </p>
                <p className="mt-3 text-fg-2">{m.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Access network */}
      <section className="section bg-surface-1" aria-labelledby="access-heading">
        <div className="container-ap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div data-reveal>
              <SectionLabel index="05">The Access Point</SectionLabel>
            </div>
            <h2 id="access-heading" data-reveal className="t-h1 mt-6">
              Access should never be the barrier.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <AccessNetwork />
          </div>
        </div>
      </section>

      {/* Capabilities + Why */}
      <section className="section" aria-labelledby="capabilities-heading">
        <div className="container-ap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div data-reveal>
              <SectionLabel index="06">Capabilities</SectionLabel>
            </div>
            <h2 id="capabilities-heading" data-reveal className="t-h2 mt-6">
              One team, end to end.
            </h2>
            <ul data-reveal="stagger" className="mt-8 border-t border-line">
              {services.map((s) => (
                <li key={s.slug} className="flex items-baseline justify-between border-b border-line py-4">
                  <span className="font-semibold">{s.title}</span>
                  <span className="t-micro text-fg-3">{s.index}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div data-reveal>
              <SectionLabel index="07">Principles</SectionLabel>
            </div>
            <h2 data-reveal className="t-h2 mt-6">
              How we work.
            </h2>
            <dl data-reveal="stagger" className="mt-8 space-y-8">
              {pillars.map((p) => (
                <div key={p.title}>
                  <dt className="t-h4">{p.title}</dt>
                  <dd className="mt-2 text-fg-2">{p.line}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Long-term vision */}
      <section className="section pt-0!" aria-labelledby="future-heading">
        <div className="container-ap">
          <div data-reveal className="card-gateway grid gap-8 p-8 hover:translate-y-0! lg:grid-cols-12 lg:p-14">
            <div className="lg:col-span-5">
              <SectionLabel index="08">Long-term vision</SectionLabel>
              <h2 id="future-heading" className="t-h2 mt-6">
                Access Point Academy
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="t-lead text-fg-2">
                Our long-term goal is a learning platform — courses, learning paths and hands-on resources that make
                technical education feel human. It is in the concept stage today, and we&apos;re building it
                deliberately, as its own product.
              </p>
              <p className="mt-6 text-fg-3">We&apos;ll share progress in Insights as it develops.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
