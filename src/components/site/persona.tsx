import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon, HeartIcon, MinusIcon } from "lucide-react"

import type { Persona } from "@/content/personas"
import { cn } from "@/lib/utils"

/** The illustration sits on a light card in both themes: the drawings have a white background. */
function Portrait({ persona, className, priority }: { persona: Persona; className?: string; priority?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-white", className)}>
      <Image
        src={persona.image}
        alt={persona.alt}
        width={898}
        height={1200}
        priority={priority}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </div>
  )
}

/** Full story block for a profession page. */
export function PersonaStory({ persona }: { persona: Persona }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
      <div className="mx-auto w-full max-w-xs lg:max-w-none">
        <Portrait persona={persona} />
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {persona.name} ist eine erfundene Figur. {persona.gender === "m" ? "Sein" : "Ihr"} Alltag ist es nicht.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium tracking-wide text-primary uppercase">{persona.role}</p>
        <h2 id="persona" className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Das ist {persona.name}.
        </h2>
        <div className="mt-5 space-y-4 text-lg leading-relaxed">
          {persona.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-3 rounded-xl bg-muted/60 p-4 text-lg">
          <HeartIcon className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
          <span>
            <span className="font-semibold">Was {persona.name} antreibt:</span> {persona.passion}
          </span>
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-xl font-semibold">Was {persona.name} den Alltag schwer macht</h3>
            <ul className="mt-4 space-y-3">
              {persona.pains.map((pain) => (
                <li key={pain} className="flex gap-3">
                  <MinusIcon className="mt-1.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="text-xl font-semibold">Was wir für {persona.name} machen</h3>
            <ul className="mt-4 space-y-3">
              {persona.fixes.map((fix) => (
                <li key={fix} className="flex gap-3">
                  <CheckIcon className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                  <span>{fix}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Compact card for the homepage, linking to the profession page. */
export function PersonaCard({ persona, href, label }: { persona: Persona; href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="bg-white">
        <Image
          src={persona.image}
          alt=""
          width={898}
          height={1200}
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
          className="mx-auto h-64 w-auto object-contain sm:h-72"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-primary">{label}</p>
        <p className="mt-1 text-xl font-semibold">
          {persona.name}, {persona.role}
        </p>
        <p className="mt-2 flex-1 text-muted-foreground">{persona.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-medium text-primary">
          {persona.name}s Alltag ansehen
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
