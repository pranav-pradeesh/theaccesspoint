import { getCourses, getFaqs, getServices, serviceHref } from "@/lib/cms";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary of the site for AI assistants and answer engines
 * (https://llmstxt.org). Generated from the same content as the pages.
 */
export async function GET() {
  const [services, courses, faqs] = await Promise.all([getServices(), getCourses(), getFaqs()]);
  const a = siteConfig.address;
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} ("${siteConfig.descriptor}") is based at ${a.street}, ${a.locality} ${a.postalCode}, ${a.region}, India.`,
    `Phone: ${siteConfig.phone.display}. Email: ${siteConfig.email}.`,
    "Training courses are taught in the classroom at the Coimbatore centre. Fees, duration and batch timings are given on enquiry.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(serviceHref(s))}): ${s.summary}`),
    "",
    "## Training courses",
    "",
    ...courses.map((c) => `- [${c.title}](${absoluteUrl(`/training/${c.slug}`)}): ${c.summary}`),
    "",
    "## Key pages",
    "",
    `- [About](${absoluteUrl("/about")}): who we are, values and mission`,
    `- [FAQ](${absoluteUrl("/faq")}): admissions, fees, certificates and projects`,
    `- [Contact](${absoluteUrl("/contact")}): phone, email, address and project enquiry form`,
    "",
    "## Frequently asked questions",
    "",
    ...faqs.flatMap((g) => g.items.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""])),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
