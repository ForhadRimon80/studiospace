"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

const navigation = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
]

const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/"
  }

  return href.startsWith("/#") ? false : pathname.startsWith(href)
}

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedHref, setSelectedHref] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("studiospace-theme")
    const shouldUseDark = savedTheme === "dark"

    document.documentElement.classList.toggle("dark", shouldUseDark)
    const frameId = window.requestAnimationFrame(() => {
      setIsDark(shouldUseDark)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)
  const selectNavigationItem = (href: string) => {
    setSelectedHref(href)
    closeMenu()
  }
  const toggleTheme = () => {
    const nextIsDark = !isDark

    document.documentElement.classList.toggle("dark", nextIsDark)
    window.localStorage.setItem("studiospace-theme", nextIsDark ? "dark" : "light")
    setIsDark(nextIsDark)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring" onClick={closeMenu} aria-label="StudioSpace home">
          <Image src="/images/logo.png" alt="StudioSpace" width={42} height={42} className="size-10 rounded-xl object-cover" priority />
          <span className="text-xl font-extrabold! tracking-tight">
            Studio<span className="text-primary">Space</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = selectedHref === item.href || (selectedHref === null && isActiveRoute(pathname, item.href));

            return (
              <Link key={item.label} href={item.href} className={`rounded-lg px-3.5 py-2 text-[15px] font-bold transition-colors ${active ? "bg-primary/10 text-primary underline decoration-primary/50 underline-offset-6 dark:bg-accent/20 dark:text-accent-lime dark:decoration-accent-lime/50" : "text-foreground hover:bg-muted hover:text-foreground"}`} aria-current={active ? "page" : undefined} onClick={() => selectNavigationItem(item.href)}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} title={isDark ? "Switch to light theme" : "Switch to dark theme"}>
            {isDark ? <Sun /> : <Moon />}
          </Button>
          <Button nativeButton={false} variant="outline" render={<Link href="/login" />} className="px-5.5 py-4.5 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground">
            Login
          </Button>
          <Button className="px-4.5 py-4.5 text-sm text-center font-medium hover:bg-dark-green dark:hover:bg-accent-lime dark:hover:text-accent-foreground" nativeButton={false} render={<Link href="/register" />}>
            Register
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t border-border/70 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 " aria-label="Mobile navigation">
            {navigation.map((item) => {
              const active = selectedHref === item.href || (selectedHref === null && isActiveRoute(pathname, item.href));

              return (
                <Link key={item.label} href={item.href} className={`rounded-lg px-3 py-2.5 text-[15px] font-bold transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted hover:text-foreground"}`} aria-current={active ? "page" : undefined} onClick={() => selectNavigationItem(item.href)}>
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 flex gap-2 border-t border-border/70 pt-4 sm:hidden">
              <Button nativeButton={false} variant="outline" render={<Link href="/login" />} className="flex-1 px-5.5 py-4.5 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground">
                Login
              </Button>
              <Button nativeButton={false} render={<Link href="/register" />} className="flex-1 px-4.5 py-4.5 text-sm text-center font-medium hover:bg-dark-green dark:hover:bg-accent-lime dark:hover:text-accent-foreground">
                Register
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;