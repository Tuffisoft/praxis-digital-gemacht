import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader, Prose, Section } from "@/components/site/blocks"
import { Todo } from "@/components/site/todo"

export const metadata: Metadata = {
  title: "Erklärung zur Barrierefreiheit",
  alternates: { canonical: "/barrierefreiheitserklaerung" },
}

export default function BarrierefreiheitserklaerungPage() {
  return (
    <>
      <PageHeader
        title="Erklärung zur Barrierefreiheit"
        lead="Wir möchten, dass alle diese Website nutzen können. Hier steht, was wir dafür tun und wo es noch hakt."
      />
      <Section>
        <Prose>
          <h2>Was wir umgesetzt haben</h2>
          <ul>
            <li>Grundschrift in 16 Pixel, die mit der Schriftgröße Ihres Browsers wächst.</li>
            <li>Farben mit gutem Kontrast, im hellen und im dunklen Modus.</li>
            <li>Ein Knopf „Vorlesen“ auf jeder Seite.</li>
            <li>Bedienbar mit der Tastatur, mit sichtbarer Markierung und einem Link „Zum Inhalt springen“.</li>
            <li>Wichtige Inhalte bleiben auch ohne Animation sofort sichtbar.</li>
            <li>Klare Überschriften und Beschriftungen, damit Screenreader die Seite gut erfassen.</li>
          </ul>

          <h2>Was noch nicht perfekt ist</h2>
          <p>
            <Todo>Ergebnis einer Prüfung, zum Beispiel mit einem Screenreader-Test, und bekannte Einschränkungen</Todo>
          </p>

          <h2>Etwas funktioniert nicht?</h2>
          <p>
            Schreiben Sie uns über das <Link href="/kontakt">Kontaktformular</Link> oder an <Todo>E-Mail-Adresse</Todo>.
            Wir kümmern uns darum.
          </p>

          <p className="text-base text-muted-foreground">
            Stand: <Todo>Datum</Todo>
          </p>
        </Prose>
      </Section>
    </>
  )
}
