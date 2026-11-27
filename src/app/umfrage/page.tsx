import type { Metadata } from "next"
import { ClockIcon, HeartIcon, LayoutGridIcon } from "lucide-react"

import { Container, PageHeader } from "@/components/site/blocks"
import { Survey } from "./survey"

export const metadata: Metadata = {
  title: "Umfrage für Heilmittelpraxen",
  description: "Drei kurze Fragen zu Ihrem Praxisalltag. Damit wir verstehen, was Heilmittelpraxen wirklich brauchen.",
  alternates: { canonical: "/umfrage" },
  // Shared directly with practices; not meant for search results.
  robots: { index: false, follow: true },
}

const points = [
  {
    icon: HeartIcon,
    title: "Wir hören zuerst zu",
    text: "Bevor wir etwas bauen, möchten wir verstehen, was Ihren Alltag schwer macht.",
  },
  {
    icon: ClockIcon,
    title: "Mehr Zeit für Ihre Patienten",
    text: "Viele kleine Aufgaben lassen sich leichter erledigen. Das schafft Luft für das, was Ihnen wichtig ist.",
  },
  {
    icon: LayoutGridIcon,
    title: "Alles an einem Ort",
    text: "Was Ihre Praxis braucht, bündeln wir an einer Stelle: auf Ihrer Website. Ohne fünf verschiedene Programme.",
  },
]

export default function UmfragePage() {
  return (
    <>
      <PageHeader
        eyebrow="Kurze Umfrage"
        title="Was macht Ihren Praxisalltag schwer?"
        lead="Wir sind Studio Fi aus Lage. Wir möchten Heilmittelpraxen den Alltag leichter machen. Dafür möchten wir zuerst von Ihnen hören, wo es hakt."
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Worum es uns geht</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Telefon, Termine, Papierkram: Vieles davon lässt sich heute einfacher lösen, Schritt für Schritt und in
              Ihrem Tempo. Welche Aufgaben das bei Ihnen sind, wissen Sie am besten.
            </p>
            <ul className="mt-8 space-y-6">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <point.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-lg font-semibold">{point.title}</p>
                    <p className="mt-1 text-muted-foreground">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Survey />
        </div>
      </Container>
    </>
  )
}
