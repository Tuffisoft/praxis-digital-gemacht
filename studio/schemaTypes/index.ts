import { defineArrayMember, defineField, defineType } from "sanity"

/** Rich text with headings, lists, links and images: enough for posts, nothing more. */
const richText = defineArrayMember({
  type: "block",
  styles: [
    { title: "Absatz", value: "normal" },
    { title: "Überschrift", value: "h2" },
    { title: "Zwischenüberschrift", value: "h3" },
  ],
  lists: [
    { title: "Aufzählung", value: "bullet" },
    { title: "Nummeriert", value: "number" },
  ],
  marks: {
    decorators: [{ title: "Fett", value: "strong" }],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [{ name: "href", type: "url", title: "Adresse", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }) }],
      },
    ],
  },
})

const imageWithAlt = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Bildbeschreibung",
      description: "Was ist auf dem Bild zu sehen? Wichtig für Menschen, die nicht gut sehen.",
    }),
  ],
})

export const post = defineType({
  name: "post",
  title: "Blog-Beitrag",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required().max(90) }),
    defineField({
      name: "slug",
      title: "Adresse (Slug)",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", title: "Autorin / Autor", type: "string" }),
    defineField({
      name: "excerpt",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
      description: "Ein bis zwei Sätze. Erscheint in der Übersicht und bei Google.",
      validation: (r) => r.max(200),
    }),
    defineField({ name: "mainImage", title: "Titelbild", ...imageWithAlt }),
    defineField({ name: "body", title: "Text", type: "array", of: [richText, imageWithAlt] }),
  ],
  orderings: [{ title: "Neueste zuerst", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "mainImage" } },
})

export const ratgeber = defineType({
  name: "ratgeber",
  title: "Praxis-Ratgeber",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required().max(90) }),
    defineField({
      name: "slug",
      title: "Adresse (Slug)",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
      validation: (r) => r.max(200),
    }),
    defineField({ name: "cover", title: "Titelbild", ...imageWithAlt }),
    defineField({ name: "intro", title: "Einleitung auf der Seite", type: "array", of: [richText] }),
    defineField({
      name: "file",
      title: "PDF-Datei",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description", media: "cover" } },
})

export const schemaTypes = [post, ratgeber]
