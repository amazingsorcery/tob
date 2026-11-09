import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

import { RouteFocus } from "@/components/route-focus";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/config/brand";

import "./globals.css";

/**
 * Fonts. The `-loaded` variable names avoid clashing with the `--font-*` tokens in
 * `app/tokens.css`, which wrap them with fallback stacks. Serif for prose, sans for UI.
 * Mono isn't preloaded since very few pages contain code.
 */
const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-loaded",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-sans-loaded",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-mono-loaded",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: brand.name,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: brand.name,
    description: brand.description,
    url: brand.url,
  },
  // Omitted entirely when no author is set.
  ...(brand.authorKnown ? { authors: [{ name: brand.author }] } : {}),
};

export const viewport: Viewport = {
  // Dark `--background` (`--slate-900`); a <meta> tag can't read custom properties.
  themeColor: "#0b0f15",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {/* Hoisted into <head> by React; machine-readable licence link. */}
        <link rel="license" href={brand.licence.url} />
        {/* First in the tab order, hidden until focused. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <RouteFocus />
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          {/* `tabIndex` so the skip link moves focus, not just scroll. */}
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
