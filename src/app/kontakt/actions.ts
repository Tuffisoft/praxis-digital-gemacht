"use server"

import { Resend } from "resend"
import { z } from "zod"

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  errors?: Partial<Record<"name" | "practice" | "email" | "phone" | "message" | "privacy", string>>
  values?: Record<string, string>
}

const professions = ["Ergotherapie", "Logopädie", "Physiotherapie", "Podologie", "Andere"] as const

const schema = z.object({
  name: z.string().trim().min(2, { error: "Bitte geben Sie Ihren Namen an." }).max(120),
  practice: z.string().trim().max(160).optional(),
  profession: z.enum(professions).optional(),
  email: z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." }).max(200),
  phone: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, { error: "Bitte schreiben Sie uns ein paar Worte zu Ihrem Anliegen." }).max(5000),
  privacy: z.string().min(1, { error: "Bitte bestätigen Sie den Hinweis zum Datenschutz." }),
})

/** Bots fill hidden fields or submit within a second or two. They get a fake success and nothing is sent. */
function looksLikeSpam(formData: FormData) {
  if (String(formData.get("website") ?? "").trim() !== "") return true
  const startedAt = Number(formData.get("startedAt"))
  if (!startedAt || Number.isNaN(startedAt)) return true
  return Date.now() - startedAt < 3000
}

const text = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === "string" && value.trim() !== "" ? value : undefined
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: text(formData, "name") ?? "",
    practice: text(formData, "practice") ?? "",
    profession: text(formData, "profession") ?? "",
    email: text(formData, "email") ?? "",
    phone: text(formData, "phone") ?? "",
    message: text(formData, "message") ?? "",
  }

  if (looksLikeSpam(formData)) {
    return { status: "success" }
  }

  const parsed = schema.safeParse({
    name: values.name,
    practice: text(formData, "practice"),
    profession: text(formData, "profession"),
    email: values.email,
    phone: text(formData, "phone"),
    message: values.message,
    privacy: text(formData, "privacy") ?? "",
  })

  if (!parsed.success) {
    const errors: ContactState["errors"] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>
      if (!errors[key]) errors[key] = issue.message
    }
    return { status: "error", message: "Bitte prüfen Sie die markierten Felder.", errors, values }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error("Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing.")
    return {
      status: "error",
      message: "Ihre Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später noch einmal.",
      values,
    }
  }

  const data = parsed.data
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Neue Anfrage: ${data.practice || data.name}`,
    text: [
      `Name: ${data.name}`,
      `Praxis: ${data.practice ?? "–"}`,
      `Fachrichtung: ${data.profession ?? "–"}`,
      `E-Mail: ${data.email}`,
      `Telefon: ${data.phone ?? "–"}`,
      "",
      data.message,
    ].join("\n"),
  })

  if (error) {
    console.error("Contact form: Resend error", error)
    return {
      status: "error",
      message: "Ihre Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später noch einmal.",
      values,
    }
  }

  // Short confirmation without repeating the message, so the form can't be misused to send content to others.
  await resend.emails
    .send({
      from,
      to: data.email,
      subject: "Ihre Anfrage bei Praxis digital gemacht",
      text: [
        `Guten Tag ${data.name},`,
        "",
        "vielen Dank für Ihre Nachricht. Wir haben sie erhalten und melden uns bei Ihnen.",
        "",
        "Viele Grüße",
        "Praxis digital gemacht – ein Angebot von Studio Fi",
      ].join("\n"),
    })
    .catch((err) => console.error("Contact form: confirmation failed", err))

  return { status: "success" }
}
