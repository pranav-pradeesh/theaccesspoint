import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { PageLoader } from "@/components/loader/PageLoader";
import { NavigationProgress } from "@/components/loader/NavigationProgress";
import { MotionController } from "@/components/motion/MotionController";
import { Header } from "@/components/navigation/Header";
import { JsonLd, organizationLd, websiteLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  ...buildMetadata({ path: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#04070d",
  colorScheme: "dark",
};

// Marks JS as available before first paint so [data-reveal] content can start hidden
// without a flash — and stays visible when JS is off.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <PageLoader />
        <NavigationProgress />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MotionController />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
