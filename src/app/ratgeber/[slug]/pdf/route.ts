import { connection } from "next/server"

import { getGuide } from "@/lib/sanity"

/**
 * Streams the guide's PDF from Sanity through our own domain,
 * so visitors' IP addresses are never sent to Sanity's CDN.
 */
export async function GET(_request: Request, { params }: RouteContext<"/ratgeber/[slug]/pdf">) {
  await connection()
  const { slug } = await params
  const guide = await getGuide(slug)
  const file = guide?.file
  if (!file?.url) return new Response("Nicht gefunden", { status: 404 })

  const upstream = await fetch(file.url)
  if (!upstream.ok || !upstream.body) return new Response("Datei nicht verfügbar", { status: 502 })

  const filename = (file.originalFilename || `${slug}.pdf`).replace(/[^\w.\-äöüÄÖÜß ]/g, "")
  return new Response(upstream.body, {
    headers: {
      "Content-Type": file.mimeType || "application/pdf",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
