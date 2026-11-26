import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { FadeIn } from "@/components/site/fade-in"
import { cn } from "@/lib/utils"

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />
}

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-16 sm:py-20", className)} {...props}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">{children}</p>
}

export function SectionTitle({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={cn("font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl", className)}>
      {children}
    </h2>
  )
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string
  title: string
  lead?: string
  children?: React.ReactNode
}) {
  return (
    <div className="border-b bg-muted/40">
      <Container className="py-14 sm:py-20">
        <FadeIn className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
          {lead && <p className="mt-5 text-lg text-muted-foreground sm:text-xl">{lead}</p>}
          {children}
        </FadeIn>
      </Container>
    </div>
  )
}

export function PrimaryLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonVariants(), "h-12 px-6 text-base", className)}>
      {children}
    </Link>
  )
}

export function SecondaryLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "outline" }), "h-12 px-6 text-base", className)}>
      {children}
    </Link>
  )
}

export function CtaSection({
  title = "Sprechen wir über Ihre Praxis.",
  text = "Ein Gespräch, in dem wir zuhören. Danach wissen Sie, was wir für Ihre Praxis tun können.",
}: {
  title?: string
  text?: string
}) {
  return (
    <Section>
      <FadeIn>
        <div className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-lg opacity-95">{text}</p>
          <Link
            href="/kontakt"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "mt-8 h-12 px-6 text-base"
            )}
          >
            Gespräch vereinbaren
          </Link>
        </div>
      </FadeIn>
    </Section>
  )
}

/** Long-form text: readable line length, comfortable spacing. */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-3xl text-lg leading-relaxed",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight sm:[&_h2]:text-3xl",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold",
        className
      )}
      {...props}
    />
  )
}
