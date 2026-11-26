import type { Metadata } from "next"
import Link from "next/link"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { CtaSection, PageHeader, Section } from "@/components/site/blocks"
import { formatDate, getPosts } from "@/lib/sanity"

export const metadata: Metadata = {
  title: "Blog",
  description: "Verständliche Beiträge für Heilmittelpraxen: Website, E-Rechnung, Barrierefreiheit und Termine.",
  alternates: { canonical: "/blog" },
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Wissen für Ihre Praxis"
        lead="Verständlich erklärt: Website, E-Rechnung, Barrierefreiheit und Termine."
      />
      <Section>
        {posts.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle className="text-xl">Die ersten Beiträge sind in Arbeit.</EmptyTitle>
              <EmptyDescription className="text-base">
                Bis dahin finden Sie Antworten in unseren <Link href="/faq">häufigen Fragen</Link>.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                  <Card className="h-full transition-colors hover:border-primary">
                    <CardHeader>
                      <p className="text-sm text-muted-foreground">
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      </p>
                      <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                      {post.excerpt && <CardDescription className="text-base">{post.excerpt}</CardDescription>}
                    </CardHeader>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <CtaSection />
    </>
  )
}
