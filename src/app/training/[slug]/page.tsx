import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseEnquiry } from "@/components/training/CourseEnquiry";
import { CourseIllustration } from "@/components/illustrations/Illustration";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { getCourse, getCourses } from "@/lib/cms";
import { breadcrumbLd, courseLd, faqLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/training/[slug]">) {
  const course = await getCourse((await params).slug);
  if (!course) return {};
  return buildMetadata({
    title: course.seoTitle,
    description: `${course.title} course in Coimbatore covering ${listJoin(course.topics)}. Syllabus, prerequisites and admission details.`,
    path: `/training/${course.slug}`,
  });
}

export default async function CoursePage({ params }: PageProps<"/training/[slug]">) {
  const { slug } = await params;
  const [course, courses] = await Promise.all([getCourse(slug), getCourses()]);
  if (!course) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Training", path: "/training" },
    { name: course.title, path: `/training/${course.slug}` },
  ];
  const related = courses.filter((c) => c.category === course.category && c.slug !== course.slug);

  return (
    <>
      <PageHero
        above={<Breadcrumbs items={crumbs} />}
        aside={<CourseIllustration slug={course.slug} />}
        label={`${course.category} course`} title={course.seoTitle} lead={course.overview}>
        {course.affiliation && (
          <p className="mt-5 text-sm">
            <span className="tag mr-2">Affiliated programme</span>
            <span className="text-fg-2">
              {course.affiliation.partner}
              {course.affiliation.certificate ? `, ${course.affiliation.certificate}` : ""}
            </span>
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#enquire" className="btn btn-primary">
            Enquire about admission
          </a>
          <a href={siteConfig.phone.href} className="btn btn-secondary">
            Call {siteConfig.phone.display}
          </a>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="facts-heading">
        <div className="container-ap">
          <h2 id="facts-heading" className="sr-only">
            Course details
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Category" value={course.category} />
            <Fact label="Mode" value="Classroom, Coimbatore" />
            <Fact label="Duration and fees" value="On enquiry" />
            <Fact label="Topics" value={course.topics.join(", ")} />
          </dl>
        </div>
      </section>

      <section className="section border-y border-line bg-surface-1" aria-labelledby="syllabus-heading">
        <div className="container-ap grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-12">
          <div>
            <h2 id="syllabus-heading" className="t-h2">
              Syllabus
            </h2>
            <p className="mt-3 text-fg-2">What the {course.title} course covers, module by module.</p>
          </div>
          <ol className="space-y-4">
            {course.modules.map((m, i) => (
              <li key={m.title} className="card bg-canvas p-6" data-reveal>
                <h3 className="t-h3">
                  Module {i + 1}: {m.title}
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-fg-2">
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="outcomes-heading">
        <div className="container-ap grid gap-12 md:grid-cols-2">
          <div>
            <h2 id="outcomes-heading" className="t-h2">
              What you will be able to do
            </h2>
            <ul className="mt-6 space-y-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-fg-2">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-h2">Who this course is for</h2>
            <ul className="mt-6 space-y-3">
              {course.audience.map((a) => (
                <li key={a} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-fg-2">{a}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-semibold">Prerequisites</h3>
            <p className="mt-2 text-fg-2">{course.prerequisites}</p>
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="faq-heading">
        <div className="container-ap">
          <h2 id="faq-heading" className="t-h2">
            {course.title}: frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqList faqs={course.faqs} />
          </div>
          <p className="mt-6 text-fg-2">
            Questions about fees, batches or certificates? See the{" "}
            <Link href="/faq" className="link">
              general FAQ
            </Link>{" "}
            or call{" "}
            <a href={siteConfig.phone.href} className="link">
              {siteConfig.phone.display}
            </a>
            .
          </p>
        </div>
      </section>

      <div className="container-ap pb-16">
        <CourseEnquiry courses={courses} defaultCourse={course.title} />
      </div>

      {related.length > 0 && (
        <section className="section border-t border-line bg-surface-1" aria-labelledby="related-heading">
          <div className="container-ap">
            <h2 id="related-heading" className="t-h2">
              Related courses
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug} data-reveal>
                  <Link href={`/training/${c.slug}`} className="card card-link block h-full overflow-hidden bg-canvas">
                    <CourseIllustration slug={c.slug} className="border-b border-line" />
                    <div className="p-6">
                      <h3 className="t-h3">{c.title}</h3>
                      <p className="mt-2 text-fg-2">{c.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <JsonLd data={[breadcrumbLd(crumbs), courseLd(course), faqLd(course.faqs)]} />
    </>
  );
}

function listJoin(items: string[]) {
  return items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : (items[0] ?? "");
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5">
      <dt className="text-sm text-fg-3">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}
