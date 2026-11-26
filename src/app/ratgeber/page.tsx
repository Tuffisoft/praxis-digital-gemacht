import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FileTextIcon } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { CtaSection, PageHeader, Section } from "@/components/site/blocks"
import { getGuides } from "@/lib/content"

export const metadata: Metadata = {
  title: "Praxis-Ratgeber",
  description:
    "Kostenlose Praxis-Ratgeber zum Herunterladen: E-Rechnung, barrierearme Website und Terminanfragen, verständlich erklärt.",
  alternates: { canonical: "/ratgeber" },
}

export default async function RatgeberPage() {
  const guides = await getGuides()

  return (
    <>
      <PageHeader
        eyebrow="Praxis-Ratgeber"
        title="Kurz erklärt, zum Mitnehmen"
        lead="Unsere Ratgeber erklären die wichtigsten Themen für Ihre Praxis in einfacher Sprache. Kostenlos als PDF, ohne Anmeldung."
      />
      <Section>
        {guides.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle className="text-xl">Die ersten Ratgeber sind in Arbeit.</EmptyTitle>
              <EmptyDescription className="text-base">
                Zur E-Rechnung gibt es schon jetzt einen <Link href="/e-rechnung">Überblick auf unserer Website</Link>.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => {
              const cover = guide.cover
              return (
                <li key={guide.slug}>
                  <Link href={`/ratgeber/${guide.slug}`} className="block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                    <Card className="h-full overflow-hidden transition-colors hover:border-primary">
                      {cover ? (
                        <Image src={cover} alt="" width={800} height={450} className="aspect-video w-full object-cover" />
                      ) : (
                        <div className="flex aspect-video items-center justify-center bg-primary/10 text-primary">
                          <FileTextIcon className="size-12" aria-hidden />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">{guide.title}</CardTitle>
                        {guide.description && <CardDescription className="text-base">{guide.description}</CardDescription>}
                      </CardHeader>
                    </Card>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </Section>
      <CtaSection />
    </>
  )
}
