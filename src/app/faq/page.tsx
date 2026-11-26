import type { Metadata } from "next"

import { CtaSection, PageHeader, Section, SectionTitle } from "@/components/site/blocks"
import { FaqList } from "@/components/site/faq-list"
import { JsonLd } from "@/components/site/json-ld"
import { faqJsonLd, faqs, faqsByTopic } from "@/content/faq"

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Antworten auf häufige Fragen von Heilmittelpraxen: Website, Vorlesefunktion, Terminanfrage, E-Rechnung und Barrierefreiheit.",
  alternates: { canonical: "/faq" },
}

const groups = [
  { topic: "allgemein", title: "Zusammenarbeit" },
  { topic: "website", title: "Website und Terminanfrage" },
  { topic: "e-rechnung", title: "E-Rechnung" },
  { topic: "barrierefreiheit", title: "Barrierefreiheit und Datenschutz" },
] as const

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fragen und Antworten"
        title="Häufige Fragen"
        lead="Kurz und verständlich beantwortet. Ihre Frage ist nicht dabei? Fragen Sie uns einfach."
      />
      {groups.map((group) => (
        <Section key={group.topic} aria-labelledby={`faq-${group.topic}`} className="py-12 sm:py-14">
          <SectionTitle id={`faq-${group.topic}`} className="mb-6 text-2xl sm:text-3xl">
            {group.title}
          </SectionTitle>
          <FaqList items={faqsByTopic(group.topic)} />
        </Section>
      ))}
      <CtaSection title="Ihre Frage ist nicht dabei?" text="Schreiben Sie uns. Wir antworten verständlich und ohne Fachbegriffe." />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  )
}
