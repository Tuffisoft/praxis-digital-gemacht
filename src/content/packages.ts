/**
 * The three packages. Prices and availability live here so they can be changed in one place.
 * price: null shows "Preis im Gespräch".
 * setup: null shows "dazu einmalig die Einrichtung" without an amount.
 * Studio Fi is a Kleinunternehmer (§ 19 UStG): prices are what the practice pays, no VAT on top.
 * If that changes, update `priceNote` below.
 */
export type PackageId = "schaufenster" | "praxis" | "komplett"

export type Package = {
  id: PackageId
  name: string
  forWhom: string
  summary: string
  /** Monthly price in euro, null = not published yet */
  price: number | null
  /** Setup fee in euro, null = not published yet */
  setup: number | null
  available: boolean
  highlight?: boolean
}

export const packages: Package[] = [
  {
    id: "schaufenster",
    name: "Schaufenster",
    forWhom: "Für Praxen, die vor allem eine gute Website brauchen.",
    summary: "Ihre Website, gut lesbar und rundum betreut. Mit Terminanfrage und einem kleinen Bereich, in dem Sie selbst Änderungen machen.",
    price: 50,
    setup: 1290,
    available: true,
  },
  {
    id: "praxis",
    name: "Praxis",
    forWhom: "Für Praxen mit vollem Telefon und langer Warteliste.",
    summary: "Alles aus dem Schaufenster, dazu Online-Termine für ganze Behandlungsserien, eine Warteliste und Erinnerungen.",
    price: 100,
    setup: 1290,
    available: true,
    highlight: true,
  },
  {
    id: "komplett",
    name: "Komplett",
    forWhom: "Für Praxen, die alles an einem Ort haben möchten.",
    summary: "Alles aus dem Paket Praxis, dazu Ihr Praxisbüro mit E-Rechnungs-Eingang, eine Seite für Team und Stellen und eine Einführung für Ihr Team.",
    price: 150,
    setup: 1290,
    available: true,
  },
]

/** Shown under the package cards */
export const terms = {
  commitment: "Mindestlaufzeit 12 Monate, danach monatlich kündbar.",
  priceNote: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
}

export type Feature = { label: string; included: Record<PackageId, boolean> }

const all = { schaufenster: true, praxis: true, komplett: true }
const fromPraxis = { schaufenster: false, praxis: true, komplett: true }
const onlyKomplett = { schaufenster: false, praxis: false, komplett: true }

export const featureGroups: { title: string; features: Feature[] }[] = [
  {
    title: "Ihr Schaufenster",
    features: [
      { label: "Website in einfacher Sprache, gut lesbar, auch auf dem Smartphone", included: all },
      { label: "Vorlesefunktion auf jeder Seite", included: all },
      { label: "Terminanfrage online", included: all },
      { label: "Eintrag bei Google Maps eingerichtet", included: all },
      { label: "Hosting, Updates und Sicherheit", included: all },
    ],
  },
  {
    title: "Ihre Praxis",
    features: [
      { label: "Öffnungszeiten, Urlaub und Team selbst ändern", included: all },
      { label: "Alle Terminanfragen an einem Ort", included: all },
      { label: "Online-Termine für ganze Behandlungsserien", included: fromPraxis },
      { label: "Warteliste mit Benachrichtigung, wenn ein Platz frei wird", included: fromPraxis },
      { label: "Terminerinnerungen für Patientinnen und Patienten", included: fromPraxis },
    ],
  },
  {
    title: "Ihr Praxisbüro",
    features: [
      { label: "E-Rechnungs-Eingang eingerichtet und erklärt", included: onlyKomplett },
      { label: "Seite für Team und Stellen", included: onlyKomplett },
      { label: "Einführung für Ihr Team am Empfang", included: onlyKomplett },
    ],
  },
]

export function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)
}
