"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="size-9"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Hell oder dunkel anzeigen"
      title="Hell oder dunkel anzeigen"
    >
      <SunIcon className="size-5 dark:hidden" aria-hidden />
      <MoonIcon className="hidden size-5 dark:block" aria-hidden />
    </Button>
  )
}
