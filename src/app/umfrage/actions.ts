"use server"

import { Resend } from "resend"
import { z } from "zod"

import { fachrichtungOptions, groesseOptions, sorgenOptions, zeitOptions } from "./questions"

export type SurveyState = {
  status: "idle" | "success" | "error"
  message?: string
}

const optional = (value: FormDataEntryValue | null) =>
  typeof value === "string" && value.trim() !== "" ? value.trim() : undefined

const schema = z
  .object({
    zeit: z.array(z.enum(zeitOptions)).min(1).max(zeitOptions.length),
    sorgen: z.array(z.enum(sorgenOptions)).min(1).max(sorgenOptions.length),
    wunsch: z.string().max(3000).optional(),
    fachrichtung: z.enum(fachrichtungOptions).optional(),
    groesse: z.enum(groesseOptions).optional(),
    email: z.email().max(200).optional(),
    einwilligung: z.string().optional(),
  })
  .refine((data) => !data.email || !!data.einwilligung, { path: ["einwilligung"] })

/** Bots fill hidden fields or submit within seconds. They get a fake success and nothing is sent. */
function looksLikeSpam(formData: FormData) {
  if (optional(formData.get("website"))) return true
  const startedAt = Number(formData.get("startedAt"))
  if (!startedAt || Number.isNaN(startedAt)) return true
  return Date.now() - startedAt < 4000
}

const errorMessage =
  "Ihre Antworten konnten gerade nicht gesendet werden. Bitte versuchen Sie es in einem Moment noch einmal."

export async function sendSurvey(_prev: SurveyState, formData: FormData): Promise<SurveyState> {
  if (looksLikeSpam(formData)) return { status: "success" }

  const parsed = schema.safeParse({
    zeit: formData.getAll("zeit"),
    sorgen: formData.getAll("sorgen"),
    wunsch: optional(formData.get("wunsch")),
    fachrichtung: optional(formData.get("fachrichtung")),
    groesse: optional(formData.get("groesse")),
    email: optional(formData.get("email")),
    einwilligung: optional(formData.get("einwilligung")),
  })

  if (!parsed.success) {
    const consentMissing = parsed.error.issues.some((issue) => issue.path[0] === "einwilligung")
    const emailInvalid = parsed.error.issues.some((issue) => issue.path[0] === "email")
    return {
      status: "error",
      message: consentMissing
        ? "Wenn Sie die Ergebnisse erhalten möchten, setzen Sie bitte noch das Häkchen beim Hinweis zur E-Mail-Adresse."
        : emailInvalid
          ? "Bitte prüfen Sie Ihre E-Mail-Adresse. Sie können das Feld auch leer lassen."
          : "Bitte beantworten Sie die ersten beiden Fragen. Gehen Sie dafür mit „Zurück“ zu ihnen.",
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error("Survey: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing.")
    return { status: "error", message: errorMessage }
  }

  const d = parsed.data
  const list = (items: readonly string[]) => items.map((item) => `  • ${item}`).join("\n")

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    ...(d.email ? { replyTo: d.email } : {}),
    subject: `Umfrage: neue Antwort${d.fachrichtung ? ` (${d.fachrichtung})` : ""}`,
    text: [
      "1. Was kostet neben der Behandlung am meisten Zeit oder Nerven?",
      list(d.zeit),
      "",
      "2. Was macht für die Praxis gerade am meisten Sorgen?",
      list(d.sorgen),
      "",
      "3. Welche Aufgabe soll ihnen jemand abnehmen?",
      `  ${d.wunsch ?? "–"}`,
      "",
      `Fachrichtung: ${d.fachrichtung ?? "–"}`,
      `Praxisgröße: ${d.groesse ?? "–"}`,
      `Ergebnisse per E-Mail: ${d.email ?? "nein"}`,
    ].join("\n"),
  })

  if (error) {
    console.error("Survey: Resend error", error)
    return { status: "error", message: errorMessage }
  }

  return { status: "success" }
}
