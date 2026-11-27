import type { Metadata } from "next"
import { CheckIcon, HeadsetIcon, LayoutGridIcon, LockIcon, MinusIcon, SproutIcon, Volume2Icon, WrenchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CtaSection, PageHeader, PrimaryLink, Section, SectionTitle } from "@/components/site/blocks"
import { FaqList } from "@/components/site/faq-list"
import { featureGroups, formatEuro, packages, terms, type Package } from "@/content/packages"
import type { Faq } from "@/content/faq"

export const metadata: Metadata = {
  title: "Pakete: alles für Ihre Praxis an einem Ort",
  description:
    "Schaufenster, Praxis, Komplett: Website, Termine und Praxisbüro in einem System. Klein anfangen, jederzeit erweitern, mit einem Ansprechpartner.",
  alternates: { canonical: "/pakete" },
}

const advantages = [
  {
    icon: LayoutGridIcon,
    title: "Alles an einem Ort",
    text: "Website, Termine und Praxisbüro in einem System. Kein Springen zwischen fünf Programmen, keine fünf Passwörter.",
  },
  {
    icon: SproutIcon,
    title: "Wächst mit Ihrer Praxis",
    text: "Fangen Sie klein an. Wenn Sie mehr brauchen, schalten wir es dazu. Ihre Website bleibt, nichts muss neu gemacht werden.",
  },
  {
    icon: HeadsetIcon,
    title: "Ein Ansprechpartner",
    text: "Sie haben eine Frage? Sie rufen uns an. Nicht eine Hotline, nicht drei verschiedene Anbieter.",
  },
  {
    icon: WrenchIcon,
    title: "Wir kümmern uns",
    text: "Updates, Sicherheit und kleine Änderungen sind im Monatspreis enthalten. Sie müssen sich um nichts Technisches kümmern.",
  },
  {
    icon: Volume2Icon,
    title: "Für alle Patientinnen und Patienten",
    text: "Gut lesbar, in einfacher Sprache und mit Vorlesefunktion. Auch für Menschen, die schlecht sehen oder lesen.",
  },
  {
    icon: LockIcon,
    title: "Sorgsam mit Daten",
    text: "So wenige Daten wie möglich, kein Tracking, Schriften auf dem eigenen Server. Wir erklären Ihnen, was wo gespeichert wird.",
  },
]

const growth = [
  { step: "Heute", title: "Schaufenster", text: "Ihre Praxis ist gut zu finden. Patientinnen und Patienten fragen Termine online an." },
  { step: "Wenn das Telefon zu oft klingelt", title: "Praxis", text: "Termine für ganze Behandlungsserien, Warteliste und Erinnerungen kommen dazu." },
  { step: "Wenn Sie alles bündeln möchten", title: "Komplett", text: "Auch Ihr Praxisbüro zieht mit ein: E-Rechnungen, Team und Stellen, Einführung fürs Team." },
]

const faqs: Faq[] = [
  {
    id: "wechseln",
    topic: "allgemein",
    question: "Kann ich später in ein größeres Paket wechseln?",
    answer: ["Ja, jederzeit. Ihre Website bleibt dieselbe, wir schalten die neuen Bereiche einfach dazu."],
  },
  {
    id: "technik-pakete",
    topic: "allgemein",
    question: "Muss ich mich mit Technik auskennen?",
    answer: ["Nein. Wir richten alles ein, erklären es in Ruhe und sind danach für Sie da."],
  },
  {
    id: "mwst",
    topic: "allgemein",
    question: "Kommt noch Mehrwertsteuer dazu?",
    answer: [
      "Nein. Studio Fi ist Kleinunternehmer, deshalb berechnen wir nach § 19 UStG keine Umsatzsteuer. Der Preis auf dieser Seite ist der Preis, den Sie zahlen.",
    ],
  },
  {
    id: "laufzeit",
    topic: "allgemein",
    question: "Wie lange binde ich mich?",
    answer: [
      "Die Mindestlaufzeit beträgt 12 Monate. Danach können Sie monatlich kündigen.",
    ],
  },
]

function Price({ pkg }: { pkg: Package }) {
  if (pkg.price === null) {
    return <p className="text-lg font-semibold">Preis im Gespräch</p>
  }
  return (
    <div>
      <p>
        <span className="font-heading text-4xl font-semibold">{formatEuro(pkg.price)}</span>
        <span className="text-muted-foreground"> im Monat</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {pkg.setup !== null ? `dazu einmalig ${formatEuro(pkg.setup)} für die Einrichtung` : "dazu einmalig die Einrichtung"}
      </p>
    </div>
  )
}

export default function PaketePage() {
  return (
    <>
      <PageHeader
        eyebrow="Pakete"
        title="Alles für Ihre Praxis an einem Ort."
        lead="Statt einer Website hier, einem Terminprogramm dort und Rechnungen irgendwo dazwischen: Wir bündeln alles in Ihrer Website. Sie fangen klein an und erweitern, wenn Sie so weit sind."
      />

      <Section aria-labelledby="vorteile">
        <SectionTitle id="vorteile">Was Sie davon haben</SectionTitle>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <li key={item.title} className="rounded-xl border bg-card p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-6" aria-hidden />
              </span>
              <p className="mt-4 text-xl font-semibold">{item.title}</p>
              <p className="mt-2 text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="wachsen" className="bg-muted/40">
        <SectionTitle id="wachsen">Klein anfangen, mitwachsen</SectionTitle>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Sie entscheiden, wann Sie den nächsten Schritt gehen. Jedes Paket baut auf dem vorigen auf.
        </p>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {growth.map((item, index) => (
            <li key={item.title} className="relative rounded-xl border bg-card p-6">
              <span
                className="flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
                aria-hidden
              >
                {index + 1}
              </span>
              <p className="mt-4 text-sm font-medium text-primary">{item.step}</p>
              <p className="mt-1 text-xl font-semibold">{item.title}</p>
              <p className="mt-2 text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="pakete">
        <SectionTitle id="pakete">Die drei Pakete</SectionTitle>
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => (
            <li
              key={pkg.id}
              className={`flex flex-col rounded-2xl border p-6 sm:p-8 ${pkg.highlight ? "border-primary bg-primary/5" : "bg-card"}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-2xl font-semibold">{pkg.name}</h3>
                {!pkg.available && (
                  <Badge variant="secondary" className="text-sm">
                    bald verfügbar
                  </Badge>
                )}
              </div>
              <p className="mt-2 font-medium">{pkg.forWhom}</p>
              <p className="mt-3 flex-1 text-muted-foreground">{pkg.summary}</p>
              <div className="mt-6">
                <Price pkg={pkg} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          {terms.commitment} {terms.priceNote} Ihr Vertrag läuft über Studio Fi.
        </p>

        <h3 className="mt-16 mb-6 font-heading text-2xl font-semibold">Was in welchem Paket steckt</h3>
        <div className="overflow-x-auto rounded-xl border">
          <Table className="text-base">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-64 py-3 text-base">Leistung</TableHead>
                {packages.map((pkg) => (
                  <TableHead key={pkg.id} className="py-3 text-center text-base">
                    {pkg.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureGroups.map((group) => (
                <FeatureGroupRows key={group.title} group={group} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section aria-labelledby="fragen-pakete" className="pt-0">
        <SectionTitle id="fragen-pakete" className="mb-8">
          Fragen zu den Paketen
        </SectionTitle>
        <FaqList items={faqs} />
        <div className="mt-10">
          <PrimaryLink href="/kontakt">Erstgespräch anfragen</PrimaryLink>
        </div>
      </Section>

      <CtaSection title="Welches Paket passt zu Ihrer Praxis?" text="Das finden wir gemeinsam heraus. In einem Gespräch, in dem wir zuerst zuhören." />
    </>
  )
}

function FeatureGroupRows({ group }: { group: (typeof featureGroups)[number] }) {
  return (
    <>
      <TableRow className="bg-muted/50 hover:bg-muted/50">
        <TableCell colSpan={packages.length + 1} className="py-3 font-semibold">
          {group.title}
        </TableCell>
      </TableRow>
      {group.features.map((feature) => (
        <TableRow key={feature.label}>
          <TableCell className="py-3 whitespace-normal">{feature.label}</TableCell>
          {packages.map((pkg) => (
            <TableCell key={pkg.id} className="py-3 text-center">
              {feature.included[pkg.id] ? (
                <>
                  <CheckIcon className="mx-auto size-5 text-primary" aria-hidden />
                  <span className="sr-only">enthalten</span>
                </>
              ) : (
                <>
                  <MinusIcon className="mx-auto size-4 text-muted-foreground" aria-hidden />
                  <span className="sr-only">nicht enthalten</span>
                </>
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
