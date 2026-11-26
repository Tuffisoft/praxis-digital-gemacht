"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { mainNav, professionNav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="outline" size="icon-lg" className="size-11 xl:hidden" aria-label="Menü öffnen" />}
      >
        <MenuIcon className="size-5" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] overflow-y-auto sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-lg">Menü</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile Navigation" className="flex flex-col gap-1 px-4 pb-6 text-base">
          <p className="px-3 pt-1 pb-2 text-sm font-medium text-muted-foreground">Für Ihre Praxis</p>
          {professionNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close} className="rounded-lg px-3 py-3 hover:bg-muted">
              {item.label}
            </Link>
          ))}
          <Separator className="my-3" />
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close} className="rounded-lg px-3 py-3 hover:bg-muted">
              {item.label}
            </Link>
          ))}
          <Separator className="my-3" />
          <Link href="/kontakt" onClick={close} className={cn(buttonVariants(), "h-12 text-base")}>
            Gespräch vereinbaren
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
