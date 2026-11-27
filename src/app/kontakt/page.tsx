import type { Metadata } from "next"

import { PageHeader, Section } from "@/components/site/blocks"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Erstgespräch anfragen",
  description:
    "Sprechen wir über Ihre Praxis: Website, Terminanfrage, E-Rechnung. Schreiben Sie uns, wir melden uns bei Ihnen.",
  alternates: { canonical: "/kontakt" },
}

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Sprechen wir über Ihre Praxis."
        lead="Erzählen Sie uns kurz, worum es geht. Wir melden uns bei Ihnen und hören erst einmal zu."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <ContactForm />
          <aside className="space-y-4 rounded-xl border bg-muted/40 p-6 text-base" aria-label="So geht es weiter">
            <p className="text-lg font-semibold">So geht es weiter</p>
            <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
              <li>Wir lesen Ihre Nachricht und melden uns.</li>
              <li>Wir sprechen über Ihre Praxis und Ihren Alltag.</li>
              <li>Danach wissen Sie, was wir für Sie tun können.</li>
            </ol>
            <p className="text-sm text-muted-foreground">Praxis digital gemacht ist ein Angebot von Studio Fi, Lage.</p>
          </aside>
        </div>
      </Section>
    </>
  )
}
