import { createClient, type SanityClient } from "@sanity/client"
import { createImageUrlBuilder } from "@sanity/image-url"
import { cacheLife, cacheTag } from "next/cache"

/**
 * Blog posts and Praxis-Ratgeber live in Sanity. Content is read at build time and cached
 * until the next (manual) deploy. Without a project ID the site simply shows no posts or guides.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export const sanityConfigured = Boolean(projectId)

const client: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion: "2026-11-01", useCdn: false, perspective: "published" })
  : null

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null

export type SanityImage = { asset?: { _ref?: string; _id?: string }; alt?: string }

export function imageUrl(image: SanityImage | undefined, width = 1200) {
  if (!builder || !image?.asset) return null
  return builder.image(image).width(width).auto("format").url()
}

export type PostSummary = {
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  author?: string
  mainImage?: SanityImage
}

export type Post = PostSummary & {
  // Portable Text blocks
  body?: unknown[]
}

export type Guide = {
  title: string
  slug: string
  description?: string
  intro?: unknown[]
  cover?: SanityImage
  file?: { url: string; size?: number; originalFilename?: string; mimeType?: string }
}

const postFields = `title, "slug": slug.current, publishedAt, excerpt, author, mainImage`
const guideFields = `title, "slug": slug.current, description, cover, "file": file.asset->{url, size, originalFilename, mimeType}`

async function query<T>(groq: string, params: Record<string, string> = {}, fallback: T): Promise<T> {
  "use cache"
  cacheLife("max")
  cacheTag("sanity")
  if (!client) return fallback
  try {
    return (await client.fetch<T>(groq, params)) ?? fallback
  } catch (error) {
    console.error("Sanity query failed", error)
    return fallback
  }
}

export const getPosts = () =>
  query<PostSummary[]>(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc){${postFields}}`,
    {},
    []
  )

export const getPost = (slug: string) =>
  query<Post | null>(`*[_type == "post" && slug.current == $slug][0]{${postFields}, body}`, { slug }, null)

export const getGuides = () =>
  query<Guide[]>(`*[_type == "ratgeber" && defined(slug.current)] | order(_createdAt desc){${guideFields}}`, {}, [])

export const getGuide = (slug: string) =>
  query<Guide | null>(`*[_type == "ratgeber" && slug.current == $slug][0]{${guideFields}, intro}`, { slug }, null)

/** Placeholder param so dynamic routes still build while Sanity is empty (Cache Components needs at least one). */
export const PLACEHOLDER_SLUG = "noch-leer"

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso))
}
