import Link from "next/link"

import { Logo } from "@/components/site/logo"
import { ReadAloud } from "@/components/site/read-aloud"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { legalNav, mainNav, professionNav, site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo withName />
          <p className="mt-4 max-w-sm text-muted-foreground">
            Websites für Heilmittelpraxen. Gut lesbar, verständlich, aus einer Hand.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {site.name} ist ein Angebot von {site.parent}, {site.city}.
          </p>
        </div>
        <nav aria-label="Für Ihre Praxis">
          <p className="font-medium">Für Ihre Praxis</p>
          <ul className="mt-3 space-y-2">
            {professionNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Weitere Seiten">
          <p className="font-medium">Wissen und Kontakt</p>
          <ul className="mt-3 space-y-2">
            {[...mainNav, { href: "/kontakt", label: "Kontakt" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ReadAloud className="h-10 text-sm" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
