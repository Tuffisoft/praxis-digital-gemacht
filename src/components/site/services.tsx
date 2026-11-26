import { CalendarCheckIcon, PencilLineIcon, ReceiptTextIcon, Volume2Icon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Volume2Icon,
    title: "Eine Website, die alle lesen können",
    text: "Ihre Patientinnen und Patienten sind jeden Alters, manche sehen oder lesen schlecht. Deshalb schreiben wir in einfacher Sprache, gestalten gut lesbar und bauen eine Vorlesefunktion ein.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Terminanfragen, die geordnet ankommen",
    text: "Patientinnen und Patienten schicken ihre Anfrage online. Sie sehen auf einen Blick, worum es geht, und melden sich, wenn es passt.",
  },
  {
    icon: ReceiptTextIcon,
    title: "E-Rechnung: gemacht",
    text: "Seit 2025 müssen Unternehmen E-Rechnungen empfangen können, auch Praxen. Wir richten den Empfang für Sie ein und zeigen Ihnen, wie Sie eine E-Rechnung öffnen.",
  },
  {
    icon: PencilLineIcon,
    title: "Kleine Änderungen machen Sie selbst",
    text: "Öffnungszeiten, Urlaub, ein neues Teammitglied: Das sollen Sie selbst ändern können, ohne IT-Kenntnisse.",
  },
]

export function Services() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {services.map((service) => (
        <Card key={service.title} className="h-full">
          <CardHeader>
            <span className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <service.icon className="size-6" aria-hidden />
            </span>
            <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed text-muted-foreground">{service.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const steps = [
  { title: "Wir sprechen über Ihre Praxis.", text: "Sie erzählen, wie Ihr Alltag aussieht und was Sie brauchen." },
  { title: "Wir richten alles ein.", text: "Website, Terminanfrage, E-Rechnungs-Empfang." },
  { title: "Sie behandeln weiter.", text: "Bei Fragen erreichen Sie uns direkt." },
]

export function Steps() {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title}>
          <div className="h-full rounded-xl border bg-card p-6">
            <span
              className="flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
              aria-hidden
            >
              {index + 1}
            </span>
            <p className="mt-4 text-xl font-semibold">{step.title}</p>
            <p className="mt-2 text-muted-foreground">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
