import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"

import matter from "gray-matter"
import { cacheLife } from "next/cache"

/**
 * Blog posts and Praxis-Ratgeber are Markdown files in /content, edited with Pages CMS
 * (see .pages.yml) or directly in the repo. They are read at build time, so changes
 * appear with the next deploy. Uploaded images and PDFs live in /public/uploads.
 */

const root = path.join(process.cwd(), "content")

export type PostSummary = {
  slug: string
  title: string
  date: string
  author?: string
  description?: string
  image?: string
  imageAlt?: string
}

export type Post = PostSummary & { body: string }

export type GuideSummary = {
  slug: string
  title: string
  description?: string
  cover?: string
  pdf?: string
}

export type Guide = GuideSummary & { body: string }

type Frontmatter = Record<string, unknown>

const str = (value: unknown) => (typeof value === "string" && value.trim() !== "" ? value.trim() : undefined)

function toIsoDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString()
  const s = str(value)
  if (!s) return undefined
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
}

/** "2026-12-01-e-rechnung-in-der-praxis.md" → "e-rechnung-in-der-praxis" */
function slugFromFilename(file: string) {
  return file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "")
}

async function readCollection(folder: string) {
  const dir = path.join(root, folder)
  let files: string[] = []
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  } catch {
    return []
  }
  return Promise.all(
    files.map(async (file) => {
      const { data, content } = matter(await readFile(path.join(dir, file), "utf8"))
      return { slug: slugFromFilename(file), data: data as Frontmatter, body: content.trim() }
    })
  )
}

function toPost({ slug, data, body }: { slug: string; data: Frontmatter; body: string }): Post | null {
  const title = str(data.title)
  const date = toIsoDate(data.date)
  if (!title || !date || data.draft === true) return null
  return {
    slug,
    title,
    date,
    author: str(data.author),
    description: str(data.description),
    image: str(data.image),
    imageAlt: str(data.image_alt),
    body,
  }
}

function toGuide({ slug, data, body }: { slug: string; data: Frontmatter; body: string }): Guide | null {
  const title = str(data.title)
  if (!title || data.draft === true) return null
  return { slug, title, description: str(data.description), cover: str(data.cover), pdf: str(data.pdf), body }
}

async function allPosts() {
  "use cache"
  cacheLife("max")
  const entries = await readCollection("blog")
  return entries
    .map(toPost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

async function allGuides() {
  "use cache"
  cacheLife("max")
  const entries = await readCollection("ratgeber")
  return entries
    .map(toGuide)
    .filter((g): g is Guide => g !== null)
    .sort((a, b) => a.title.localeCompare(b.title, "de"))
}

export async function getPosts(): Promise<PostSummary[]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (await allPosts()).map(({ body, ...summary }) => summary)
}

export async function getPost(slug: string) {
  return (await allPosts()).find((p) => p.slug === slug) ?? null
}

export async function getGuides(): Promise<GuideSummary[]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (await allGuides()).map(({ body, ...summary }) => summary)
}

export async function getGuide(slug: string) {
  return (await allGuides()).find((g) => g.slug === slug) ?? null
}

/** File size of an uploaded file under /public, e.g. "/uploads/ratgeber/x.pdf". */
export async function publicFileSize(publicPath: string) {
  "use cache"
  cacheLife("max")
  try {
    const safe = path.normalize(publicPath).replace(/^([/\\])+/, "")
    if (safe.startsWith("..")) return undefined
    return (await stat(path.join(process.cwd(), "public", safe))).size
  } catch {
    return undefined
  }
}

/** Placeholder param so dynamic routes still build while a collection is empty (Cache Components needs at least one). */
export const PLACEHOLDER_SLUG = "noch-leer"

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" }).format(
    new Date(iso)
  )
}
