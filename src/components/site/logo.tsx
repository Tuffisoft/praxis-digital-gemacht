import Link from "next/link"

import { cn } from "@/lib/utils"

/**
 * The binary heart. Drawn as a CSS mask over the brand colour, so it follows
 * light and dark mode automatically and the large SVG is loaded once, as a file.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block aspect-[940/795] bg-primary", className)}
      style={{
        mask: "url(/logo.svg) center / contain no-repeat",
        WebkitMask: "url(/logo.svg) center / contain no-repeat",
      }}
    />
  )
}

export function Logo({ className, withName = false }: { className?: string; withName?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Praxis digital gemacht – zur Startseite"
      className={cn(
        "flex shrink-0 items-center gap-3 rounded-md leading-tight whitespace-nowrap outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <LogoMark className={withName ? "h-12" : "h-14"} />
      {withName && (
        <span className="flex flex-col">
          <span className="font-heading text-lg font-semibold tracking-tight">
            Praxis <span className="text-primary">digital</span> gemacht
          </span>
          <span className="text-xs text-muted-foreground">ein Angebot von Studio Fi</span>
        </span>
      )}
    </Link>
  )
}
