import { ProjectBuilder } from "@/components/contact/ProjectBuilder";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Start a Project",
  description: "Tell us about your website, software or branding project. Send a short brief and we'll reply with next steps.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read your brief", line: "Every brief is read by a person, not filtered by a bot." },
  { title: "We reply with questions", line: "Usually a short list of questions, or a time to talk." },
  { title: "Discovery call", line: "We learn how your business works and what success looks like." },
  { title: "A clear proposal", line: "Scope, timeline and cost — in writing, with no surprises." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--ambient-glow)" }} aria-hidden />
        <div className="container-ap relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div data-reveal>
              <SectionLabel>Contact</SectionLabel>
            </div>
            <h1 data-reveal className="t-h1 mt-8">
              Have something in mind?
            </h1>
            <p data-reveal className="t-lead mt-6 text-fg-2">
              Let&apos;s turn the idea into something people can experience.
            </p>

            <div data-reveal className="mt-12 hidden lg:block">
              <p className="t-micro text-fg-3">What happens next</p>
              <ol className="mt-5 space-y-5 border-l border-line pl-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="relative">
                    <span aria-hidden className="absolute top-2 -left-[27px] size-[7px] rounded-full bg-cyan" />
                    <p className="font-semibold">
                      <span className="font-mono text-xs text-fg-3">0{i + 1}</span> {s.title}
                    </p>
                    <p className="mt-1 text-sm text-fg-2">{s.line}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div data-reveal className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="t-micro text-fg-3">Prefer to talk directly?</p>
                <a href={`mailto:${siteConfig.email}`} className="link-cta mt-3 flex w-fit text-lg">
                  {siteConfig.email}
                </a>
                <a href={siteConfig.phone.href} className="link-cta mt-3 flex w-fit text-lg">
                  {siteConfig.phone.display}
                </a>
              </div>
              <div>
                <p className="t-micro text-fg-3">Visit us</p>
                <address className="mt-3 text-fg-2 not-italic">
                  {siteConfig.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>

          <div data-reveal className="lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-6">
            <ProjectBuilder />
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
