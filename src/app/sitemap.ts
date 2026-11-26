import type { MetadataRoute } from "next"

import { getGuides, getPosts } from "@/lib/content"
import { site } from "@/lib/site"

const staticRoutes = [
  "",
  "/ergotherapie",
  "/logopaedie",
  "/physiotherapie",
  "/podologie",
  "/e-rechnung",
  "/barrierefreiheit",
  "/ratgeber",
  "/blog",
  "/faq",
  "/kontakt",
  "/barrierefreiheitserklaerung",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, guides] = await Promise.all([getPosts(), getGuides()])
  return [
    ...staticRoutes.map((path) => ({ url: `${site.url}${path}` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
    ...guides.map((g) => ({ url: `${site.url}/ratgeber/${g.slug}` })),
  ]
}
