import { CourseEnquiry } from "@/components/training/CourseEnquiry";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCourses, type CourseCategory } from "@/lib/cms";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Training Courses",
  description:
    "Practical training in Coimbatore: Android, Java, PHP, .NET, web and hybrid app development, animation, hardware & networking and cloud computing.",
  path: "/training",
});

const categories: { name: CourseCategory; blurb: string }[] = [
  { name: "Programming", blurb: "Web, mobile and desktop development — from fundamentals to working applications." },
  { name: "Creative", blurb: "Animation, visual effects and multimedia." },
  { name: "Infrastructure", blurb: "Hardware, networking, security and cloud." },
];

export default async function TrainingPage() {
  const courses = await getCourses();

  return (
    <>
      <PageHero
        label="Training"
        title="Practical courses that build real skills."
        lead="Hands-on training in programming, web and mobile development, animation, networking and cloud computing — taught at our Coimbatore centre."
      >
        <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#enquire" className="btn btn-primary btn-lg">
            Enquire about admission <span className="arrow">→</span>
          </a>
          <a href="#courses" className="btn btn-secondary btn-lg">
            View courses
          </a>
        </div>
      </PageHero>

      <div id="courses" className="container-ap scroll-mt-28 pb-8">
        {categories.map(({ name, blurb }) => {
          const list = courses.filter((c) => c.category === name);
          if (!list.length) return null;
          return (
            <section key={name} aria-labelledby={`cat-${name}`} className="border-t border-line py-14 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div data-reveal>
                    <SectionLabel>{`${list.length} ${list.length === 1 ? "course" : "courses"}`}</SectionLabel>
                  </div>
                  <h2 id={`cat-${name}`} data-reveal className="t-h2 mt-5">
                    {name}
                  </h2>
                  <p data-reveal className="mt-3 max-w-sm text-fg-2">
                    {blurb}
                  </p>
                </div>
                <ul data-reveal="stagger" className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                  {list.map((c) => (
                    <li key={c.slug} id={c.slug} className="card-gateway flex flex-col p-6 hover:translate-y-0! lg:p-7">
                      <h3 className="t-h4">{c.title}</h3>
                      <p className="mt-3 text-[15px] text-fg-2">{c.summary}</p>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${c.title} topics`}>
                        {c.topics.map((t) => (
                          <li key={t} className="tag">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <a href={`#enquire-${c.slug}`} className="link-cta mt-auto pt-6 text-sm">
                        Enquire about this course <span className="arrow">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <div className="container-ap pb-24 lg:pb-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div data-reveal>
              <SectionLabel>Visit or call</SectionLabel>
            </div>
            <p data-reveal className="t-h3 mt-5">
              Talk to us about batches, timings and fees.
            </p>
            <div data-reveal className="mt-6 space-y-2 text-fg-2">
              <a href={siteConfig.phone.href} className="link-cta flex w-fit text-lg text-fg">
                {siteConfig.phone.display}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="link-cta flex w-fit text-fg">
                {siteConfig.email}
              </a>
              <address className="pt-3 not-italic">
                {siteConfig.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
          <div data-reveal className="lg:col-span-8">
            <CourseEnquiry courses={courses} />
          </div>
        </div>
      </div>

      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Training", path: "/training" },
          ]),
          ...courses.map((c) => ({
            "@context": "https://schema.org",
            "@type": "Course",
            name: c.title,
            description: c.summary,
            url: absoluteUrl(`/training#${c.slug}`),
            provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          })),
        ]}
      />
    </>
  );
}
