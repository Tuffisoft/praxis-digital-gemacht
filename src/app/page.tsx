import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Container,
  CtaSection,
  Eyebrow,
  PrimaryLink,
  SecondaryLink,
  Section,
  SectionTitle,
} from "@/components/site/blocks";
import { FaqList } from "@/components/site/faq-list";
import { Services, Steps } from "@/components/site/services";
import { faqsById } from "@/content/faq";
import { PersonaCard } from "@/components/site/persona";
import { personas } from "@/content/personas";
import { professionNav, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} – Websites für Heilmittelpraxen` },
  description: site.description,
  alternates: { canonical: "/" },
};

const highlights = [
  "Gut lesbar für alle Altersgruppen",
  "Vorlesefunktion auf jeder Seite",
  "Terminanfrage statt Telefonschleife",
  "E-Rechnungs-Empfang eingerichtet",
];

export default function HomePage() {
  const faqItems = faqsById([
    "technik",
    "e-rechnung-schreiben",
    "barrierefrei",
  ]);

  return (
    <>
      <div className="border-b bg-muted/40">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Eyebrow>
              Für Ergotherapie, Logopädie, Physiotherapie und Podologie
            </Eyebrow>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Ihre Praxis,{" "}
              <span className="text-primary">digital gemacht.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Wir bauen Websites für Heilmittelpraxen: gut lesbar, mit
              Vorlesefunktion und Terminanfrage. Und wir richten ein, was in
              Ihrer Praxis sonst digital anfällt. Sie behandeln weiter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink href="/kontakt">Erstgespräch anfragen</PrimaryLink>
              <SecondaryLink href="#leistungen">Was wir machen</SecondaryLink>
            </div>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground">
              Schreiben Sie kurz, worum es geht. Wir melden uns bei Ihnen und
              hören erst einmal zu.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Ein Angebot von Studio Fi aus Lage.
            </p>
          </div>
          <div>
            <Card className="shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm font-medium text-muted-foreground">
                  Ihre Website mit uns
                </p>
                <ul className="mt-4 space-y-4">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg">
                      <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckIcon className="size-4" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-lg bg-muted p-4 text-base">
                  Probieren Sie es aus: Unten auf jeder Seite finden Sie den
                  Knopf <strong>„Vorlesen“</strong>.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      <Section aria-labelledby="alltag">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle id="alltag">
              Für Ergotherapie, Logopädie, Physiotherapie und Podologie
            </SectionTitle>
          </div>
          <div className="space-y-5 text-lg">
            <p>
              Ihr Tag gehört Ihren Patientinnen und Patienten. Trotzdem kommt
              das Digitale dazu: die Website, Terminanfragen, die E-Rechnung.
              Oft alles gleichzeitig und jedes Mal mit einem anderen Programm.
            </p>
            <p className="font-medium">
              Wir nehmen Ihnen das ab. Aus einer Hand, mit einem
              Ansprechpartner.
            </p>
          </div>
        </div>
        <p className="mt-12 text-lg text-muted-foreground">
          Lernen Sie Anna, Kalli, Hektor und Thea kennen. Vielleicht erkennen Sie sich wieder.
        </p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {professionNav.map((item) => {
            const persona = personas.find((p) => `/${p.profession}` === item.href)
            if (!persona) return null
            return (
              <li key={item.href}>
                <PersonaCard persona={persona} href={item.href} label={item.label} />
              </li>
            )
          })}
        </ul>
      </Section>

      <Section
        id="leistungen"
        aria-labelledby="leistungen-titel"
        className="bg-muted/40"
      >
        <SectionTitle id="leistungen-titel">
          Was wir für Ihre Praxis machen
        </SectionTitle>
        <div className="mt-10">
          <Services />
        </div>
        <div className="mt-10">
          <SecondaryLink href="/pakete">Pakete und Preise ansehen</SecondaryLink>
        </div>
      </Section>

      <Section aria-labelledby="ablauf">
        <SectionTitle id="ablauf">So läuft es ab</SectionTitle>
        <div className="mt-10">
          <Steps />
        </div>
      </Section>

      <Section aria-labelledby="fragen">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle id="fragen">Häufige Fragen</SectionTitle>
          <Link
            href="/faq"
            className="text-lg font-medium text-primary underline underline-offset-4"
          >
            Alle Fragen ansehen
          </Link>
        </div>
        <FaqList items={faqItems} />
      </Section>

      <CtaSection />
    </>
  );
}
