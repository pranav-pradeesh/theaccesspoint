import Link from "next/link";
import { CourseEnquiry } from "@/components/training/CourseEnquiry";
import { PageHero } from "@/components/ui/PageHero";
import { getCourses, type CourseCategory } from "@/lib/cms";
import { breadcrumbLd, itemListLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Training Courses",
  description:
    "IT training courses in Coimbatore: Android, Java, PHP, .NET, web and hybrid app development, animation, hardware and networking, and cloud computing.",
  path: "/training",
});

const categories: CourseCategory[] = ["Programming", "Creative", "Infrastructure"];

export default async function TrainingPage() {
  const courses = await getCourses();

  return (
    <>
      <PageHero
        label="Training"
        title="Training courses"
        lead="Classroom courses in programming, web and mobile development, animation, networking and cloud computing at our Coimbatore centre. Contact us for batch timings, duration and fees."
      >
        <p className="mt-4 max-w-2xl text-fg-2">
          Several of our courses are offered as affiliated programmes, leading to a certificate from the affiliated
          institution. Ask us which courses are affiliated and the certification each one leads to.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#enquire" className="btn btn-primary">
            Enquire about admission
          </a>
          <a href={siteConfig.phone.href} className="btn btn-secondary">
            Call {siteConfig.phone.display}
          </a>
        </div>
      </PageHero>

      <div className="container-ap">
        {categories.map((name) => {
          const list = courses.filter((c) => c.category === name);
          if (!list.length) return null;
          return (
            <section key={name} aria-labelledby={`cat-${name}`} className="border-b border-line py-12">
              <h2 id={`cat-${name}`} className="t-h2">
                {name}
              </h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {list.map((c) => (
                  <li key={c.slug} id={c.slug} className="card flex scroll-mt-24 flex-col p-6">
                    <h3 className="t-h3">
                      <Link href={`/training/${c.slug}`} className="hover:text-accent">
                        {c.title}
                      </Link>
                    </h3>
                    {c.affiliation && (
                      <p className="mt-2 text-sm">
                        <span className="tag mr-2">Affiliated programme</span>
                        <span className="text-fg-2">
                          {c.affiliation.partner}
                          {c.affiliation.certificate ? `, ${c.affiliation.certificate}` : ""}
                        </span>
                      </p>
                    )}
                    <p className="mt-2 text-fg-2">{c.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${c.title} topics`}>
                      {c.topics.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-5 text-sm font-semibold">
                      <Link href={`/training/${c.slug}`} className="link">
                        Syllabus and details<span className="sr-only">: {c.title}</span>
                      </Link>
                      <a href={`#enquire-${c.slug}`} className="link">
                        Enquire<span className="sr-only"> about {c.title}</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="container-ap py-12 lg:py-16">
        <CourseEnquiry courses={courses} />
      </div>

      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Training", path: "/training" },
          ]),
          itemListLd("Training courses", courses.map((c) => ({ name: c.title, path: `/training/${c.slug}` }))),
        ]}
      />
    </>
  );
}
