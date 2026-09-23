import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { NavigationProgress } from "@/components/loader/NavigationProgress";
import { PageLoader } from "@/components/loader/PageLoader";
import { Header } from "@/components/navigation/Header";
import { SmoothScroll } from "@/components/navigation/SmoothScroll";
import { JsonLd, organizationLd, websiteLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  ...buildMetadata({ path: "/" }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
  colorScheme: "light dark",
};

// Runs before first paint: marks JS as available (for the page loader) and applies the saved
// theme, or the system theme when none is saved, so there is no flash of the wrong colours.
const bootScript = `(function(){var r=document.documentElement;r.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';r.dataset.theme=t})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <PageLoader />
        <NavigationProgress />
        <SmoothScroll />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
