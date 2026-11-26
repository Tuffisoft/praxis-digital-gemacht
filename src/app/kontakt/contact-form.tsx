"use client"

import Link from "next/link"
import { CheckCircle2Icon } from "lucide-react"
import { useActionState, useEffect, useRef } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { sendContact, type ContactState } from "./actions"

const initialState: ContactState = { status: "idle" }
const inputClass = "h-12 px-3 text-base md:text-base"

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState)
  const startedAt = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now())
  }, [])

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus()
  }, [state])

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} className="outline-none">
        <Alert className="p-6 text-base">
          <CheckCircle2Icon aria-hidden className="text-primary" />
          <AlertTitle className="text-lg">Vielen Dank für Ihre Nachricht.</AlertTitle>
          <AlertDescription className="text-base">
            Wir haben Ihre Anfrage erhalten und melden uns bei Ihnen. Eine kurze Bestätigung ist per E-Mail unterwegs.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const errors = state.errors ?? {}
  const v = state.values ?? {}

  return (
    <form action={formAction} noValidate className="space-y-6" data-no-read>
      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {state.status === "error" && (
          <Alert variant="destructive" className="p-4 text-base">
            <AlertTitle className="text-base">{state.message}</AlertTitle>
          </Alert>
        )}
      </div>

      {/* Spam protection without a captcha: a field people don't see, and the time it took to fill in. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />

      <FieldGroup className="gap-6">
        <Field data-invalid={!!errors.name || undefined}>
          <FieldLabel htmlFor="name" className="text-base">
            Ihr Name
          </FieldLabel>
          <Input id="name" name="name" autoComplete="name" required defaultValue={v.name} aria-invalid={!!errors.name} className={inputClass} />
          <FieldError>{errors.name}</FieldError>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="practice" className="text-base">
              Name der Praxis <span className="font-normal text-muted-foreground">(freiwillig)</span>
            </FieldLabel>
            <Input id="practice" name="practice" autoComplete="organization" defaultValue={v.practice} className={inputClass} />
          </Field>
          <Field>
            <FieldLabel htmlFor="profession" className="text-base">
              Fachrichtung <span className="font-normal text-muted-foreground">(freiwillig)</span>
            </FieldLabel>
            <NativeSelect id="profession" name="profession" defaultValue={v.profession ?? ""} className="w-full [&_select]:h-12 [&_select]:text-base">
              <NativeSelectOption value="">Bitte wählen</NativeSelectOption>
              <NativeSelectOption value="Ergotherapie">Ergotherapie</NativeSelectOption>
              <NativeSelectOption value="Logopädie">Logopädie</NativeSelectOption>
              <NativeSelectOption value="Physiotherapie">Physiotherapie</NativeSelectOption>
              <NativeSelectOption value="Podologie">Podologie</NativeSelectOption>
              <NativeSelectOption value="Andere">Andere</NativeSelectOption>
            </NativeSelect>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={!!errors.email || undefined}>
            <FieldLabel htmlFor="email" className="text-base">
              E-Mail-Adresse
            </FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} aria-invalid={!!errors.email} className={inputClass} />
            <FieldError>{errors.email}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="phone" className="text-base">
              Telefon <span className="font-normal text-muted-foreground">(freiwillig)</span>
            </FieldLabel>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className={inputClass} />
            <FieldDescription className="text-base">Wenn Sie lieber einen Rückruf möchten.</FieldDescription>
          </Field>
        </div>

        <Field data-invalid={!!errors.message || undefined}>
          <FieldLabel htmlFor="message" className="text-base">
            Ihre Nachricht
          </FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={6}
            required
            defaultValue={v.message}
            aria-invalid={!!errors.message}
            className="min-h-40 px-3 py-2 text-base md:text-base"
            placeholder="Zum Beispiel: Wir brauchen eine neue Website und haben Fragen zur E-Rechnung."
          />
          <FieldError>{errors.message}</FieldError>
        </Field>

        <Field orientation="horizontal" className="items-start" data-invalid={!!errors.privacy || undefined}>
          <Checkbox id="privacy" name="privacy" value="ja" aria-invalid={!!errors.privacy} className="mt-1 size-5" />
          <div className="space-y-1">
            <FieldLabel htmlFor="privacy" className="text-base leading-snug font-normal">
              <span>
                Ich habe den <Link href="/datenschutz" className="text-primary underline underline-offset-4">Hinweis zum Datenschutz</Link>{" "}
                gelesen. Meine Angaben werden nur für die Antwort auf meine Anfrage verwendet.
              </span>
            </FieldLabel>
            <FieldError>{errors.privacy}</FieldError>
          </div>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={pending} className="h-12 w-full px-6 text-base sm:w-auto">
        {pending && <Spinner aria-hidden />}
        {pending ? "Wird gesendet …" : "Nachricht senden"}
      </Button>
    </form>
  )
}
