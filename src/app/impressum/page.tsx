import type { Metadata } from "next"

import { PageHeader, Prose, Section } from "@/components/site/blocks"
import { Todo } from "@/components/site/todo"

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
  robots: { index: false },
}

// Every <Todo> must be filled with Studio Fi's real data before going live.
export default function ImpressumPage() {
  return (
    <>
      <PageHeader title="Impressum" />
      <Section>
        <Prose>
          <p>Praxis digital gemacht ist ein Angebot von Studio Fi.</p>

          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            Studio Fi
            <br />
            <Todo>Name der Inhaberin / des Inhabers oder Firma mit Rechtsform</Todo>
            <br />
            <Todo>Straße und Hausnummer</Todo>
            <br />
            <Todo>Postleitzahl</Todo> Lage
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: <Todo>Telefonnummer</Todo>
            <br />
            E-Mail: <Todo>E-Mail-Adresse</Todo>
          </p>

          <h2>Umsatzsteuer</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <Todo>USt-IdNr., falls vorhanden</Todo>
          </p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            <Todo>Name und Anschrift der verantwortlichen Person</Todo>
          </p>

          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </Prose>
      </Section>
    </>
  )
}
