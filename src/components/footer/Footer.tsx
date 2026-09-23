import { TransitionLink } from "@/components/transitions/TransitionLink";
import { siteConfig } from "@/lib/site";
import { FooterGateway } from "./FooterGateway";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-obsidian">
      <div className="hairline-glow absolute inset-x-0 top-0" aria-hidden />
      <div className="container-ap relative pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="t-micro text-cyan">[ Gateway to Knowledge ]</p>
            <p className="t-h1 mt-6 max-w-[14ch]">Technology should open doors.</p>
            <p className="mt-6 max-w-md text-fg-2">
              Websites, software, brands and learning — built where technology meets creativity.
            </p>
            <TransitionLink href="/contact" data-magnetic data-track="Footer CTA" className="btn btn-primary btn-lg mt-10">
              Start a Project <span className="arrow">→</span>
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-[auto_1fr_auto] sm:gap-16 lg:col-span-6 lg:pl-10">
            <nav aria-label="Footer">
              <p className="t-micro text-fg-3">Explore</p>
              <ul className="mt-5 space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <TransitionLink href={l.href} className="link-underline text-fg-2 hover:text-fg">
                      {l.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="t-micro text-fg-3">Contact</p>
              <ul className="mt-5 space-y-3 text-fg-2">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="link-underline hover:text-fg">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href={siteConfig.phone.href} className="link-underline hover:text-fg">
                    {siteConfig.phone.display}
                  </a>
                </li>
                <li>
                  <address className="not-italic">
                    {siteConfig.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              </ul>
            </div>
            {siteConfig.socials.length > 0 && (
              <div>
                <p className="t-micro text-fg-3">Social</p>
                <ul className="mt-5 space-y-3">
                  {siteConfig.socials.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} className="link-underline text-fg-2 hover:text-fg" rel="noopener noreferrer" target="_blank">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <FooterGateway />

        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="t-micro">Gateway to Knowledge</p>
        </div>
      </div>
    </footer>
  );
}
