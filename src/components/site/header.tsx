import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Logo } from "@/components/site/logo"
import { MobileNav } from "@/components/site/mobile-nav"
import { mainNav, professionNav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <NavigationMenu className="ml-4 hidden xl:flex" aria-label="Hauptnavigation">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-11 px-3 text-base">Für Ihre Praxis</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-80 gap-1 p-2">
                  {professionNav.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink
                        render={<Link href={item.href} />}
                        className="flex flex-col items-start gap-0.5 p-3"
                      >
                        <span className="text-base font-medium">{item.label}</span>
                        <span className="text-sm text-muted-foreground">{item.description}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {mainNav.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  render={<Link href={item.href} />}
                  className={cn(navigationMenuTriggerStyle(), "h-11 px-3 text-base")}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/kontakt"
            className={cn(buttonVariants(), "hidden h-11 px-5 text-base md:inline-flex")}
          >
            Erstgespräch anfragen
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
