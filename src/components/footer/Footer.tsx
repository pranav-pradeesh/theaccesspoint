import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface-1">
      <div className="container-ap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-fg-2">
            Web development, software, design, digital marketing and IT training in Coimbatore.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-fg">Pages</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg-2 hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-fg">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-fg-2">
            <li>
              <a href={siteConfig.phone.href} className="hover:text-fg">
                {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-fg">
                {siteConfig.email}
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
          {siteConfig.socials.length > 0 && (
            <ul className="mt-4 flex gap-4 text-sm">
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-fg-2 hover:text-fg" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-ap py-5 text-sm text-fg-3">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
