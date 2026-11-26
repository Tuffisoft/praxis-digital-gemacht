import type { Metadata } from "next"
import { InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CtaSection, PageHeader, Prose, Section } from "@/components/site/blocks"
import { FaqList } from "@/components/site/faq-list"
import { faqsByTopic } from "@/content/faq"

export const metadata: Metadata = {
  title: "E-Rechnung in der Heilmittelpraxis: Was gilt, was nicht",
  description:
    "E-Rechnung für Ergotherapie, Logopädie, Physiotherapie und Podologie: Empfangen müssen Praxen seit 2025, ausstellen meist nicht. Verständlich erklärt.",
  alternates: { canonical: "/e-rechnung" },
}

const rows = [
  {
    topic: "E-Rechnungen empfangen",
    rule: "Pflicht für alle Unternehmen seit 1. Januar 2025, auch für Praxen und Kleinunternehmer. Es gibt keine Übergangsfrist. Für den Anfang genügt ein E-Mail-Postfach.",
  },
  {
    topic: "E-Rechnungen für Heilbehandlungen ausstellen",
    rule: "In der Regel nicht nötig. Heilbehandlungen sind nach § 4 Nr. 14 UStG umsatzsteuerfrei und deshalb von der Pflicht ausgenommen. Rechnungen an Privatpatienten gehen an Verbraucher und fallen ebenfalls nicht darunter.",
  },
  {
    topic: "Ausnahmen",
    rule: "Umsatzsteuerpflichtige Leistungen an andere Unternehmen, zum Beispiel Kurse oder Gesundheitsangebote, die ein Arbeitgeber bezahlt. Rechnungen bis 250 Euro brutto sind ausgenommen.",
  },
  {
    topic: "Abrechnung mit den Krankenkassen",
    rule: "Ein eigenes elektronisches Verfahren. Es ist nicht die E-Rechnung aus dem Umsatzsteuergesetz.",
  },
]

const sources = [
  { label: "IHK: E-Rechnungen, Änderungen und Übergangsregeln", href: "https://www.ihk.de/elbeweser/recht-und-steuern/steuerrecht/e-rechnungen-7228090" },
  { label: "IHK: E-Rechnungen für inländische B2B-Umsätze", href: "https://www.ihk.de/meo/recht-und-steuern/steuerrecht/umsatzsteuer/e-rechnung-ab-01-01-2025-6277246" },
  { label: "ETL: E-Rechnung im Gesundheitswesen", href: "https://www.etl.de/besonderheiten-gesundheitswesen" },
]

export default function ERechnungPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ratgeber E-Rechnung"
        title="E-Rechnung in der Praxis: Was gilt, was nicht"
        lead="Kurz gesagt: Empfangen müssen Sie E-Rechnungen können. Für Ihre Heilbehandlungen müssen Sie in der Regel keine ausstellen."
      />

      <Section>
        <Prose>
          <p>
            Rund um die E-Rechnung kursieren viele Hinweise, und die meisten richten sich an andere Branchen. Für
            Heilmittelpraxen ist die Lage übersichtlicher, als sie klingt.
          </p>
          <h2>Was für Ihre Praxis gilt</h2>
        </Prose>
        <div className="mt-2 max-w-4xl overflow-x-auto rounded-xl border">
          <Table className="text-base">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 py-3 text-base">Thema</TableHead>
                <TableHead className="py-3 text-base">Was gilt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.topic}>
                  <TableCell className="py-4 align-top font-medium whitespace-normal">{row.topic}</TableCell>
                  <TableCell className="py-4 align-top whitespace-normal text-muted-foreground">{row.rule}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Prose className="mt-10">
          <h2>Was eine E-Rechnung ist</h2>
          <p>
            Eine E-Rechnung ist keine PDF-Datei, sondern eine Rechnung in einem festen, maschinenlesbaren Format. Die
            bekanntesten heißen <strong>XRechnung</strong> und <strong>ZUGFeRD</strong>. Öffnet man eine XRechnung
            ohne passendes Programm, sieht man nur Code. Das ist normal und kein Fehler.
          </p>
          <h2>Was wir für Sie einrichten</h2>
          <ul>
            <li>Eine eigene E-Mail-Adresse für Rechnungen, zum Beispiel rechnungen@ihre-praxis.de.</li>
            <li>Ein Weg, E-Rechnungen lesbar anzuzeigen.</li>
            <li>Auf Wunsch die Weiterleitung an Ihre Steuerberatung.</li>
          </ul>
          <p>Und wir zeigen Ihnen in Ruhe, wie Sie eine E-Rechnung öffnen.</p>
        </Prose>

        <Alert className="mt-10 max-w-3xl p-5 text-base">
          <InfoIcon aria-hidden />
          <AlertTitle className="text-base">Keine Steuerberatung</AlertTitle>
          <AlertDescription className="text-base">
            Diese Seite gibt einen allgemeinen Überblick, Stand November 2026. Was genau für Ihre Praxis gilt, klären
            Sie bitte mit Ihrer Steuerberatung.
          </AlertDescription>
        </Alert>

        <Prose className="mt-10">
          <h2>Quellen</h2>
          <ul>
            {sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} rel="noopener noreferrer" target="_blank">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </Prose>
      </Section>

      <Section className="pt-0">
        <h2 className="mb-6 font-heading text-2xl font-semibold sm:text-3xl">Häufige Fragen zur E-Rechnung</h2>
        <FaqList items={faqsByTopic("e-rechnung")} />
      </Section>

      <CtaSection title="E-Rechnung: gemacht." text="Wir richten den Empfang für Ihre Praxis ein und erklären Ihnen alles in Ruhe." />
    </>
  )
}
