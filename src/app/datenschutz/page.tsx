import type { Metadata } from "next"

import { PageHeader, Prose, Section } from "@/components/site/blocks"
import { Todo } from "@/components/site/todo"

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false },
}

// DRAFT. Have this reviewed legally before going live and fill every <Todo>.
export default function DatenschutzPage() {
  return (
    <>
      <PageHeader title="Datenschutzerklärung" lead="Wir erheben so wenige Daten wie möglich. Hier steht, welche und warum." />
      <Section>
        <Prose>
          <h2>Verantwortlich</h2>
          <p>
            Studio Fi, <Todo>Name, Anschrift, E-Mail</Todo>
          </p>

          <h2>Hosting</h2>
          <p>
            Diese Website wird bei Vercel Inc. gehostet und über ein Rechenzentrum in Frankfurt am Main ausgeliefert.
            Beim Aufruf verarbeitet der Server technisch notwendige Daten wie Ihre IP-Adresse, Datum und Uhrzeit und
            die aufgerufene Seite. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und stabilen
            Betrieb (Art. 6 Abs. 1 lit. f DSGVO). <Todo>Hinweis auf Auftragsverarbeitungsvertrag und Datenübermittlung in die USA</Todo>
          </p>

          <h2>Schriften</h2>
          <p>
            Die Schriften dieser Website liegen auf unserem eigenen Server. Beim Aufruf werden keine Daten an Google
            oder andere Schriftanbieter übertragen.
          </p>

          <h2>Keine Cookies, kein Tracking</h2>
          <p>
            Wir setzen keine Analyse- oder Werbedienste ein. Die Einstellung „hell oder dunkel“ speichert Ihr Browser
            nur lokal auf Ihrem Gerät.
          </p>

          <h2>Vorlesefunktion</h2>
          <p>
            Die Vorlesefunktion nutzt die Sprachausgabe Ihres Browsers. Wir übertragen dafür keine Daten. Je nach
            Browser und Gerät kann die Sprachausgabe einen Dienst des Browserherstellers nutzen.
          </p>

          <h2>Kontaktformular</h2>
          <p>
            Wenn Sie uns über das Formular schreiben, verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten
            (Art. 6 Abs. 1 lit. b DSGVO). Für den Versand der E-Mails nutzen wir den Dienst Resend.{" "}
            <Todo>Anbieterangaben Resend, Auftragsverarbeitungsvertrag, Serverstandort, Speicherdauer</Todo>
          </p>

          <h2>Blog und Ratgeber</h2>
          <p>
            Die Inhalte von Blog und Ratgeber verwalten wir mit Sanity. Die Downloads der Ratgeber liefern wir über
            unsere eigene Domain aus. <Todo>Anbieterangaben Sanity und Auftragsverarbeitungsvertrag</Todo>
          </p>

          <h2>Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch. Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde
            beschweren. <Todo>zuständige Aufsichtsbehörde (Nordrhein-Westfalen)</Todo>
          </p>

          <p className="text-base text-muted-foreground">
            Stand: <Todo>Datum</Todo>
          </p>
        </Prose>
      </Section>
    </>
  )
}
