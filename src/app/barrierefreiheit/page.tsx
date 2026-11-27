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
              <strong>Gut lesbar:</strong> gut lesbare Schrift, klare Kontraste, genug Abstand. Die Schrift wächst mit, wenn
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
              <strong>Ruhig:</strong> keine blinkenden Elemente oder automatisch startenden Animationen.
            </li>
          </ul>
          <h2>Schriftgrößen im Beispiel</h2>
          <p>
            Die Grundschrift dieser Website ist 16 Pixel. Hier sehen Sie, wie verschiedene Größen im Text wirken. Die
            Browser-Zoomfunktion vergrößert alle Größen.
          </p>
          <div className="my-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">14 px · Hinweis</div>
              <div className="mt-1 text-sm leading-relaxed">Sprechzeiten und kurze Zusatzinfos.</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">16 px · Fließtext</div>
              <div className="mt-1 text-base leading-relaxed">Wir gestalten Ihre Website passend zu Ihrer Praxis.</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">18 px · Hervorhebung</div>
              <div className="mt-1 text-lg leading-relaxed">Gut lesbar auf jedem Gerät.</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">24 px · Zwischenüberschrift</div>
              <div className="mt-1 font-heading text-2xl font-semibold">Ihre Praxis im Mittelpunkt</div>
            </div>
          </div>
          <p>Diese Website ist selbst so gebaut. Probieren Sie den Knopf „Vorlesen“ unten auf der Seite aus.</p>

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
