import Link from "next/link"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 flex-col rounded-md leading-tight whitespace-nowrap outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <span className="font-heading text-lg font-semibold tracking-tight">
        Praxis <span className="text-primary">digital</span> gemacht
      </span>
      <span className="text-xs text-muted-foreground">ein Angebot von Studio Fi</span>
    </Link>
  )
}
