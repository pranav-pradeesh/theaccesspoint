import Link from "next/link";
import { FaqList } from "@/components/ui/FaqList";
import { getCourses, getFaqs, getServices, serviceHref } from "@/lib/cms";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const [services, courses, faqs] = await Promise.all([getServices(), getCourses(), getFaqs()]);
  const topFaqs = faqs.flatMap((g) => g.items).filter((f) => f.featured);

  return (
    <>
      {/* Intro */}
      <section className="border-b border-line pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-ap grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Coimbatore, Tamil Nadu</p>
            <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.02em]">
              Web development, software and IT training in Coimbatore.
            </h1>
            <p className="t-lead mt-5 max-w-xl">
              The Access Point builds websites, software and brands for businesses, and runs practical training courses
              for students and working professionals.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Discuss a project
              </Link>
              <Link href="/training" className="btn btn-secondary">
                View training courses
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-base font-semibold">Get in touch</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-fg-3">Phone</dt>
                <dd className="mt-0.5">
                  <a href={siteConfig.phone.href} className="text-base font-semibold hover:text-accent">
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-fg-3">Email</dt>
                <dd className="mt-0.5">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-fg-3">Address</dt>
                <dd className="mt-0.5 text-fg-2">
                  <address className="not-italic">
                    {siteConfig.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="section" aria-labelledby="about-heading">
        <div className="container-ap grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 id="about-heading" className="t-h2">
            About The Access Point
          </h2>
          <div className="space-y-4 text-lg text-fg-2">
            <p>
              The Access Point is a Coimbatore company with two sides to its work. For businesses and institutions, we
              design and build websites, web applications, software and mobile apps, and look after branding and digital
              marketing. For learners, we run classroom training courses in programming, web and mobile development,
              animation, hardware and networking, and cloud computing.
            </p>
            <Link href="/about" className="link inline-block text-base font-semibold">
              More about us
            </Link>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section border-y border-line bg-surface-1" aria-labelledby="audience-heading">
        <div className="container-ap">
          <h2 id="audience-heading" className="t-h2">
            Who we work with
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {audiences.map((a) => (
              <li key={a.title} className="card bg-canvas p-6">
                <h3 className="t-h3">{a.title}</h3>
                <p className="mt-2 text-fg-2">{a.text}</p>
                <Link href={a.href} className="link mt-4 inline-block text-sm font-semibold">
                  {a.cta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container-ap">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="services-heading" className="t-h2">
                Services
              </h2>
              <p className="mt-2 text-fg-2">What we do for businesses and organisations.</p>
            </div>
            <Link href="/services" className="link text-sm font-semibold">
              All services
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={serviceHref(s)}
                  className="card block h-full p-6 transition-colors hover:border-line-strong"
                >
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="mt-2 text-fg-2">{s.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Training */}
      <section className="section border-y border-line bg-surface-1" aria-labelledby="training-heading">
        <div className="container-ap">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="training-heading" className="t-h2">
                Training courses
              </h2>
              <p className="mt-2 max-w-xl text-fg-2">
                Classroom courses at our Coimbatore centre. Contact us for batch timings, duration and fees.
              </p>
            </div>
            <Link href="/training" className="link text-sm font-semibold">
              Course details and admission
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <li key={c.slug} className="border-b border-line">
                <Link href={`/training/${c.slug}`} className="flex items-center justify-between gap-4 py-3.5 hover:text-accent">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-sm text-fg-3">{c.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container-ap">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="faq-heading" className="t-h2">
              Common questions
            </h2>
            <Link href="/faq" className="link text-sm font-semibold">
              All questions
            </Link>
          </div>
          <div className="mt-8">
            <FaqList faqs={topFaqs} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" aria-labelledby="contact-heading">
        <div className="container-ap">
          <div className="card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="contact-heading" className="t-h2">
                Talk to us
              </h2>
              <p className="mt-2 text-fg-2">
                Call{" "}
                <a href={siteConfig.phone.href} className="link">
                  {siteConfig.phone.display}
                </a>{" "}
                or send us your requirements and we&apos;ll get back to you.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Discuss a project
              </Link>
              <Link href="/training#enquire" className="btn btn-secondary">
                Course enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const audiences = [
  {
    title: "Businesses",
    text: "Websites, online stores, business software, mobile apps, branding and marketing for companies of every size.",
    href: "/services",
    cta: "Our services",
  },
  {
    title: "Students and graduates",
    text: "Practical courses in Java, Android, PHP, .NET, web development, animation, networking and cloud computing.",
    href: "/training",
    cta: "Training courses",
  },
  {
    title: "Working professionals",
    text: "Courses to learn a new technology or move into a new role, from programming to networking and the cloud.",
    href: "/training",
    cta: "Find a course",
  },
];
