import type { Metadata } from "next"
import { InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CtaSection, PageHeader, Prose, Section } from "@/components/site/blocks"
import { FaqList } from "@/components/site/faq-list"
import { faqsByTopic } from "@/content/faq"

export const metadata: Metadata = {
  title: "Barrierearme Website für Praxen",
  description:
    "Was eine barrierearme Praxiswebsite ausmacht: gut lesbar, einfache Sprache, Vorlesefunktion, bedienbar mit Tastatur. Und was das BFSG damit zu tun hat.",
  alternates: { canonical: "/barrierefreiheit" },
}

export default function BarrierefreiheitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Barrierefreiheit"
        title="Eine Website, die alle nutzen können"
        lead="Ihre Patientinnen und Patienten sind jeden Alters, manche sehen, hören oder lesen schlecht. Eine barrierearme Website nimmt darauf Rücksicht."
      />
      <Section>
        <Prose>
          <h2>Was eine barrierearme Praxiswebsite ausmacht</h2>
          <ul>
            <li>
              <strong>Gut lesbar:</strong> große Schrift, klare Kontraste, genug Abstand. Die Schrift wächst mit, wenn
              jemand sie im Browser vergrößert.
            </li>
            <li>
              <strong>Einfache Sprache:</strong> kurze Sätze, bekannte Wörter, Fachbegriffe nur mit Erklärung.
            </li>
            <li>
              <strong>Vorlesefunktion:</strong> Ein Knopf liest die Seite vor. Sie nutzt die Sprachausgabe, die im
              Browser schon eingebaut ist.
            </li>
            <li>
              <strong>Bedienbar ohne Maus:</strong> Alles funktioniert auch mit der Tastatur, und man sieht immer, wo
              man gerade ist.
            </li>
            <li>
              <strong>Ruhig:</strong> keine blinkenden Elemente. Wer auf seinem Gerät „Bewegung reduzieren“
              eingestellt hat, sieht keine Animationen.
            </li>
          </ul>
          <p>Diese Website ist selbst so gebaut. Probieren Sie den Knopf „Vorlesen“ oben auf der Seite aus.</p>

          <h2>Barrierearm, nicht „100 % barrierefrei“</h2>
          <p>
            Vollständige Barrierefreiheit hängt von vielen Details ab, auch von Inhalten, die sich später ändern. Wir
            versprechen deshalb nichts Pauschales. Wir bauen barrierearm und sagen Ihnen offen, was umgesetzt ist.
          </p>

          <h2>Und das Barrierefreiheitsstärkungsgesetz?</h2>
          <p>
            Seit Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz (BFSG). Ob es für Ihre Praxiswebsite gilt, hängt
            vom Einzelfall ab, zum Beispiel davon, was Patientinnen und Patienten auf der Website abschließen können.
            Unabhängig davon profitieren Ihre Patientinnen und Patienten von einer Website, die alle nutzen können.
          </p>
        </Prose>

        <Alert className="mt-10 max-w-3xl p-5 text-base">
          <InfoIcon aria-hidden />
          <AlertTitle className="text-base">Keine Rechtsberatung</AlertTitle>
          <AlertDescription className="text-base">
            Diese Seite gibt einen allgemeinen Überblick. Ob gesetzliche Pflichten für Ihre Website gelten, klären Sie
            bitte rechtlich.
          </AlertDescription>
        </Alert>
      </Section>

      <Section className="pt-0">
        <h2 className="mb-6 font-heading text-2xl font-semibold sm:text-3xl">Häufige Fragen</h2>
        <FaqList items={faqsByTopic("barrierefreiheit")} />
      </Section>

      <CtaSection />
    </>
  )
}
