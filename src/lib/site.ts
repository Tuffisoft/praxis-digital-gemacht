export const site = {
  name: "Praxis digital gemacht",
  parent: "Studio Fi",
  city: "Detmold",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://praxis-digital-gemacht.de").replace(/\/$/, ""),
  tagline: "Ihre Praxis, digital gemacht.",
  description:
    "Websites für Heilmittelpraxen: gut lesbar, mit Vorlesefunktion und Terminanfrage. Dazu richten wir ein, was in Ihrer Praxis sonst digital anfällt. Ein Angebot von Studio Fi aus Detmold.",
} as const

export type NavItem = { href: string; label: string; description?: string }

export const professionNav: NavItem[] = [
  { href: "/ergotherapie", label: "Ergotherapie", description: "Websites für Ergotherapie-Praxen" },
  { href: "/logopaedie", label: "Logopädie", description: "Websites für Logopädie-Praxen" },
  { href: "/physiotherapie", label: "Physiotherapie", description: "Websites für Physiotherapie-Praxen" },
  { href: "/podologie", label: "Podologie", description: "Websites für Podologie-Praxen" },
]

export const mainNav: NavItem[] = [
  { href: "/e-rechnung", label: "E-Rechnung" },
  { href: "/barrierefreiheit", label: "Barrierefreiheit" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Fragen" },
]

export const legalNav: NavItem[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/barrierefreiheitserklaerung", label: "Erklärung zur Barrierefreiheit" },
]
