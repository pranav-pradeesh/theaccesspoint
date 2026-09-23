import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact The Access Point in Coimbatore about a website, software, design or marketing project, or a training course.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Contact us"
        lead="Tell us about your project and we'll get back to you. For course admissions, use the enquiry form on the Training page."
      />
      <section className="section">
        <div className="container-ap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-fg-3">Phone</h2>
              <a href={siteConfig.phone.href} className="mt-1 block text-lg font-semibold hover:text-cyan">
                {siteConfig.phone.display}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-fg-3">Email</h2>
              <a href={`mailto:${siteConfig.email}`} className="mt-1 block hover:text-cyan">
                {siteConfig.email}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-fg-3">Address</h2>
              <address className="mt-1 text-fg-2 not-italic">
                {siteConfig.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-fg-3">Training admissions</h2>
              <Link href="/training#enquire" className="link mt-1 inline-block">
                Course enquiry form
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
