"use client"

import Link from "next/link"
import { HeartHandshakeIcon } from "lucide-react"
import { startTransition, useActionState, useEffect, useRef, useState } from "react"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { sendSurvey, type SurveyState } from "./actions"
import { fachrichtungOptions, groesseOptions, sorgenOptions, zeitOptions } from "./questions"

const steps = ["zeit", "sorgen", "wunsch", "details"] as const
const initialState: SurveyState = { status: "idle" }

const titleClass = "font-heading text-2xl leading-snug font-semibold sm:text-3xl"
const choiceClass = "min-h-14 items-center px-4 py-3 text-base sm:text-lg [&_[data-slot=questionnaire-choice-indicator]]:size-5"
const navClass = "h-12 px-6 text-base sm:h-12"

function ChoiceCard({ value, id }: { value: string; id: string }) {
  return (
    <FieldLabel htmlFor={id} className="w-full">
      <Field orientation="horizontal" className="min-h-14 items-center gap-3 px-4 py-3">
        <RadioGroupItem value={value} id={id} className="size-5" />
        <FieldContent>
          <FieldTitle className="text-base font-normal sm:text-lg">{value}</FieldTitle>
        </FieldContent>
      </Field>
    </FieldLabel>
  )
}

export function Survey() {
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const started = startedAt !== null
  const [current, setCurrent] = useState<string>(steps[0])
  const [state, formAction, pending] = useActionState(sendSurvey, initialState)
  const area = useRef<HTMLDivElement>(null)

  const index = Math.max(0, steps.indexOf(current as (typeof steps)[number]))
  const progress = `Frage ${index + 1} von ${steps.length}`

  useEffect(() => {
    if (state.status !== "idle") area.current?.focus()
  }, [state])

  // On a new step, bring the top of the survey back into view if the visitor had scrolled down.
  useEffect(() => {
    const el = area.current
    if (!started || !el) return
    if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" })
  }, [current, started])

  if (state.status === "success") {
    return (
      <div ref={area} tabIndex={-1} className="rounded-2xl border bg-card p-6 outline-none sm:p-10">
        <HeartHandshakeIcon className="size-10 text-primary" aria-hidden />
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight">Vielen Dank, dass Sie mitgemacht haben.</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Ihre Antworten helfen uns sehr. Wir lesen jede einzelne und schauen, wie wir Praxen wie Ihrer den Alltag leichter
          machen können. Wenn Sie Ihre E-Mail-Adresse angegeben haben, melden wir uns mit den Ergebnissen bei Ihnen.
        </p>
        <p className="mt-6 text-lg">
          Bis dahin finden Sie Antworten auf häufige Fragen{" "}
          <Link href="/faq" className="font-medium text-primary underline underline-offset-4">
            hier
          </Link>
          .
        </p>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="rounded-2xl border bg-card p-6 sm:p-10">
        <p className="text-lg">3 kurze Fragen und ein paar Angaben zu Ihrer Praxis. Das dauert etwa eine Minute.</p>
        <ul className="mt-4 space-y-2 text-base text-muted-foreground">
          <li>Sie antworten anonym, wenn Sie möchten.</li>
          <li>Es gibt keine falschen Antworten.</li>
          <li>Sie können jederzeit zurückgehen.</li>
        </ul>
        <Button className="mt-8 h-12 px-6 text-base" onClick={() => setStartedAt(Date.now())}>
          Umfrage starten
        </Button>
      </div>
    )
  }

  return (
    <div ref={area} tabIndex={-1} className="rounded-2xl border bg-card p-6 outline-none sm:p-10" data-no-read>
      {state.status === "error" && (
        <Alert variant="destructive" className="mb-6 p-4 text-base">
          <AlertTitle className="text-base">{state.message}</AlertTitle>
        </Alert>
      )}

      <Questionnaire
        item={current}
        onItemChange={setCurrent}
        onSubmit={(event) => {
          // The questionnaire validates every step first and only then lets the submit through.
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          startTransition(() => formAction(data))
        }}
        className="gap-6"
      >
        {/* Spam protection without a captcha: a field people don't see, and the time it took to answer. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="survey-website">Website</label>
          <input id="survey-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="startedAt" value={startedAt ?? ""} />

        <div className="space-y-2">
          <QuestionnaireProgress aria-label="Fortschritt der Umfrage" aria-valuetext={progress} className="text-sm">
            {progress}
          </QuestionnaireProgress>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${((index + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <QuestionnaireItem name="zeit" multiple required>
          <QuestionnaireTitle className={titleClass}>
            Was kostet Sie neben der Behandlung am meisten Zeit oder Nerven?
          </QuestionnaireTitle>
          <QuestionnaireDescription className="text-base">Sie können mehrere Antworten wählen.</QuestionnaireDescription>
          <QuestionnaireChoices className="gap-3">
            {zeitOptions.map((option) => (
              <QuestionnaireChoice key={option} value={option} className={choiceClass}>
                {option}
              </QuestionnaireChoice>
            ))}
          </QuestionnaireChoices>
          <QuestionnaireError className="text-base">Bitte wählen Sie mindestens eine Antwort aus.</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="sorgen" multiple required>
          <QuestionnaireTitle className={titleClass}>Was macht Ihnen für Ihre Praxis gerade am meisten Sorgen?</QuestionnaireTitle>
          <QuestionnaireDescription className="text-base">Sie können mehrere Antworten wählen.</QuestionnaireDescription>
          <QuestionnaireChoices className="gap-3">
            {sorgenOptions.map((option) => (
              <QuestionnaireChoice key={option} value={option} className={choiceClass}>
                {option}
              </QuestionnaireChoice>
            ))}
          </QuestionnaireChoices>
          <QuestionnaireError className="text-base">Bitte wählen Sie mindestens eine Antwort aus.</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="wunsch">
          <QuestionnaireTitle className={titleClass}>
            Wenn Ihnen jemand eine Aufgabe in Ihrer Praxis abnehmen könnte: Welche wäre das?
          </QuestionnaireTitle>
          <QuestionnaireDescription className="text-base">
            Schreiben Sie so, wie Sie es einer Kollegin erzählen würden. Ein Satz reicht.
          </QuestionnaireDescription>
          <QuestionnaireInput
            aria-label="Ihre Antwort"
            render={<textarea rows={4} />}
            className="min-h-32 px-3 py-2 text-base md:text-base"
            placeholder="Zum Beispiel: die ständigen Rückrufe wegen Terminen"
          />
        </QuestionnaireItem>

        <QuestionnaireItem name="details">
          <QuestionnaireTitle className={titleClass}>Zum Schluss: ein paar Angaben zu Ihrer Praxis</QuestionnaireTitle>
          <QuestionnaireDescription className="text-base">Alle Angaben sind freiwillig.</QuestionnaireDescription>
          {/* Every field on this step is optional; this marks the step as answered so it can be submitted. */}
          <QuestionnaireInput render={<input type="hidden" />} defaultValue="ja" />

          <FieldGroup className="gap-8">
            <fieldset className="space-y-3">
              <legend className="mb-3 text-lg font-medium">Ihre Fachrichtung</legend>
              <RadioGroup name="fachrichtung" className="gap-3 sm:grid-cols-2">
                {fachrichtungOptions.map((option, i) => (
                  <ChoiceCard key={option} value={option} id={`fachrichtung-${i}`} />
                ))}
              </RadioGroup>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="mb-3 text-lg font-medium">Wie viele arbeiten in Ihrer Praxis?</legend>
              <RadioGroup name="groesse" className="gap-3 sm:grid-cols-3">
                {groesseOptions.map((option, i) => (
                  <ChoiceCard key={option} value={option} id={`groesse-${i}`} />
                ))}
              </RadioGroup>
            </fieldset>

            <Field>
              <FieldLabel htmlFor="survey-email" className="text-lg font-medium">
                Möchten Sie die Ergebnisse erhalten?
              </FieldLabel>
              <FieldDescription className="text-base">
                Dann tragen Sie hier Ihre E-Mail-Adresse ein. Sonst lassen Sie das Feld einfach leer.
              </FieldDescription>
              <Input id="survey-email" name="email" type="email" autoComplete="email" className="h-12 px-3 text-base md:text-base" />
            </Field>

            <Field orientation="horizontal" className="items-start">
              <Checkbox id="survey-consent" name="einwilligung" value="ja" className="mt-1 size-5" />
              <FieldLabel htmlFor="survey-consent" className="text-base leading-snug font-normal">
                <span>
                  Sie dürfen mir die Ergebnisse an diese Adresse schicken. Mehr dazu im{" "}
                  <Link href="/datenschutz" className="text-primary underline underline-offset-4">
                    Hinweis zum Datenschutz
                  </Link>
                  .
                </span>
              </FieldLabel>
            </Field>
          </FieldGroup>
        </QuestionnaireItem>

        <QuestionnaireActions className="mt-2 border-t pt-6">
          <QuestionnairePrevious className={navClass}>Zurück</QuestionnairePrevious>
          <QuestionnaireSkip className={navClass}>Überspringen</QuestionnaireSkip>
          <QuestionnaireNext className={navClass}>Weiter</QuestionnaireNext>
          <QuestionnaireSubmit className={navClass} disabled={pending}>
            {pending && <Spinner aria-hidden />}
            {pending ? "Wird gesendet …" : "Antworten senden"}
          </QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
