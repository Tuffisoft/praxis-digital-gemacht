import type { Metadata } from "next"
import { CheckIcon } from "lucide-react"

import { CtaSection, PageHeader, PrimaryLink, Section, SectionTitle } from "@/components/site/blocks"
import { FaqList } from "@/components/site/faq-list"
import { PersonaStory } from "@/components/site/persona"
import { Services, Steps } from "@/components/site/services"
import { faqsById } from "@/content/faq"
import { getPersona } from "@/content/personas"
import { getProfession, type Profession } from "@/content/professions"

export function professionMetadata(slug: Profession["slug"]): Metadata {
  const p = getProfession(slug)
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title: p.metaTitle, description: p.metaDescription, url: `/${p.slug}` },
  }
}

const faqIds = ["technik", "terminanfrage", "e-rechnung-schreiben", "barrierefrei"]

export function ProfessionPage({ slug }: { slug: Profession["slug"] }) {
  const p = getProfession(slug)
  const faqItems = faqsById(faqIds)

  return (
    <>
      <PageHeader eyebrow={`Für ${p.practice}`} title={`Eine Website für Ihre ${p.name}-Praxis.`} lead={p.lead}>
        <div className="mt-8">
          <PrimaryLink href="/kontakt">Erstgespräch anfragen</PrimaryLink>
        </div>
      </PageHeader>

      <Section aria-labelledby="persona">
        <PersonaStory persona={getPersona(slug)} />
      </Section>

      <Section aria-labelledby="needs" className="bg-muted/40">
        <SectionTitle id="needs">{p.needsTitle}</SectionTitle>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {p.needs.map((need) => (
            <li key={need.title}>
              <div className="h-full rounded-xl border bg-card p-6">
                <CheckIcon className="size-6 text-primary" aria-hidden />
                <p className="mt-3 text-xl font-semibold">{need.title}</p>
                <p className="mt-2 text-muted-foreground">{need.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="leistungen">
        <SectionTitle id="leistungen">Was wir für Ihre Praxis machen</SectionTitle>
        <div className="mt-10">
          <Services />
        </div>
      </Section>

      <Section aria-labelledby="ablauf">
        <SectionTitle id="ablauf">So läuft es ab</SectionTitle>
        <div className="mt-10">
          <Steps />
        </div>
      </Section>

      <Section aria-labelledby="fragen">
        <SectionTitle id="fragen" className="mb-8">
          Häufige Fragen
        </SectionTitle>
        <FaqList items={faqItems} />
      </Section>

      <CtaSection />
    </>
  )
}
