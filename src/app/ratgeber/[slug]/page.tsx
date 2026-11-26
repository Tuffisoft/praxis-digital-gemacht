import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, DownloadIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Container, CtaSection } from "@/components/site/blocks"
import { Markdown } from "@/components/site/markdown"
import { PLACEHOLDER_SLUG, getGuide, getGuides, publicFileSize } from "@/lib/content"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  const guides = await getGuides()
  return guides.length ? guides.map((g) => ({ slug: g.slug })) : [{ slug: PLACEHOLDER_SLUG }]
}

export async function generateMetadata({ params }: PageProps<"/ratgeber/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) return { title: "Ratgeber nicht gefunden", robots: { index: false } }
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/ratgeber/${guide.slug}` },
  }
}

function formatSize(bytes?: number) {
  if (!bytes) return null
  const format = (n: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(n)
  return bytes < 1024 * 1024 ? `${format(Math.max(1, Math.round(bytes / 1024)))} KB` : `${format(bytes / 1024 / 1024)} MB`
}

export default async function GuidePage({ params }: PageProps<"/ratgeber/[slug]">) {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) notFound()

  const size = guide.pdf ? formatSize(await publicFileSize(guide.pdf)) : null

  return (
    <>
      <Container className="max-w-3xl py-14 sm:py-20">
        <Link href="/ratgeber" className="inline-flex items-center gap-2 text-base text-primary underline-offset-4 hover:underline">
          <ArrowLeftIcon className="size-4" aria-hidden /> Alle Ratgeber
        </Link>
        <p className="mt-6 text-sm font-medium tracking-wide text-primary uppercase">Praxis-Ratgeber</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{guide.title}</h1>
        {guide.description && <p className="mt-5 text-xl text-muted-foreground">{guide.description}</p>}

        {guide.pdf && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={guide.pdf} className={cn(buttonVariants(), "h-12 gap-2 px-6 text-base")} download>
              <DownloadIcon className="size-5" aria-hidden />
              Ratgeber herunterladen
            </a>
            <span className="text-muted-foreground">PDF{size ? `, ${size}` : ""}, kostenlos</span>
          </div>
        )}

        {guide.cover && <Image src={guide.cover} alt="" width={1200} height={675} className="mt-10 h-auto w-full rounded-2xl" />}

        <div className="mt-10">
          <Markdown>{guide.body}</Markdown>
        </div>
      </Container>
      <CtaSection />
    </>
  )
}
