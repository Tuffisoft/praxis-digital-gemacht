import { PageHeader, PrimaryLink, SecondaryLink } from "@/components/site/blocks"

export default function NotFound() {
  return (
    <PageHeader title="Diese Seite gibt es nicht." lead="Vielleicht hat sich die Adresse geändert. Von hier aus finden Sie weiter.">
      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryLink href="/">Zur Startseite</PrimaryLink>
        <SecondaryLink href="/kontakt">Kontakt</SecondaryLink>
      </div>
    </PageHeader>
  )
}
