import Link from "next/link"

import { siteConfig } from "@/config/site"
import {Button} from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import ROUTES from "@/constants/ROUTES";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />

            <Link href={ROUTES.SIGN_IN}>
              <Button variant="ghost">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
