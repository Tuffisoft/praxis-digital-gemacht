import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { Container, CtaSection } from "@/components/site/blocks"
import { JsonLd } from "@/components/site/json-ld"
import { PortableText } from "@/components/site/portable-text"
import { PLACEHOLDER_SLUG, formatDate, getPost, getPosts, imageUrl } from "@/lib/sanity"
import { site } from "@/lib/site"

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER_SLUG }]
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Beitrag nicht gefunden", robots: { index: false } }
  const image = imageUrl(post.mainImage, 1200)
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      ...(image ? { images: [{ url: image, width: 1200 }] } : {}),
    },
  }
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const image = imageUrl(post.mainImage, 1600)

  return (
    <>
      <article>
        <Container className="max-w-3xl py-14 sm:py-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-base text-primary underline-offset-4 hover:underline">
            <ArrowLeftIcon className="size-4" aria-hidden /> Alle Beiträge
          </Link>
          <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.author ? ` · ${post.author}` : null}
          </p>
          {post.excerpt && <p className="mt-6 text-xl text-muted-foreground">{post.excerpt}</p>}
          {image && (
            <Image
              src={image}
              alt={post.mainImage?.alt ?? ""}
              width={1600}
              height={900}
              priority
              className="mt-10 h-auto w-full rounded-2xl"
            />
          )}
          <div className="mt-10">
            <PortableText value={post.body} />
          </div>
        </Container>
      </article>
      <CtaSection />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: site.parent },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          ...(image ? { image } : {}),
        }}
      />
    </>
  )
}
