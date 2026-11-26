import type { Metadata, Viewport } from "next"
import { Lora, Plus_Jakarta_Sans } from "next/font/google"

import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { JsonLd } from "@/components/site/json-ld"
import { Providers } from "@/components/site/providers"
import { site } from "@/lib/site"
import "./globals.css"

// next/font downloads the fonts at build time and serves them from our own domain:
// no requests to Google from the visitor's browser.
const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" })
const fontSerif = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Websites für Heilmittelpraxen`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    url: site.url,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1f1e" },
  ],
}

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  areaServed: { "@type": "Country", name: "Deutschland" },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "DE" },
  parentOrganization: { "@type": "Organization", name: site.parent },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} flex min-h-svh flex-col antialiased`}>
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        <Providers>
          <Header />
          <main id="inhalt" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
        <JsonLd data={organization} />
      </body>
    </html>
  )
}
