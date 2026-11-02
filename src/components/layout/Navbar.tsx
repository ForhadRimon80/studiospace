"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useState } from "react"
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button"
import { toast } from "../ui/toast"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { FaChevronDown, FaUser } from "react-icons/fa";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
]

  // Check active route
const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/"
  }

  return href.startsWith("/#") ? false : pathname.startsWith(href)
}

// Function to get a valid image URL from Google Drive or any other source
const getImageUrl = (image?: string | null) => {
  const imageUrl = image?.trim();
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1];

    if (fileId && url.hostname === "drive.google.com") {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`;
    }

    return url.protocol === "http:" || url.protocol === "https:" ? imageUrl : null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedHref, setSelectedHref] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Get the current session and user information (client side)
  const { data: session } = useSession();
  const user = session?.user;
  const imageUrl = getImageUrl(user?.image);

  // Handle sign out and display a toast notification if there's an error
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.add({
        title: "SignOut failed",
        description: error instanceof Error ? error.message : "Something went wrong while signOut.",
        type: "error",
      });
    }
  };

  // Load saved theme
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("studiospace-theme");
    const shouldUseDark = savedTheme === "dark";

    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frameId = window.requestAnimationFrame(() => {
      setIsDark(shouldUseDark);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  // Close mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  // Select a navigation item
  const selectNavigationItem = (href: string) => {
    setSelectedHref(href);
    closeMenu();
  };

  // Toggle theme
  const toggleTheme = () => {
    const nextIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("studiospace-theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      {/* Navigation bar */}
      <div className="container mx-auto flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring" onClick={closeMenu} aria-label="StudioSpace home">
          <Image src="/images/logo.png" alt="StudioSpace" width={42} height={42} className="size-10 rounded-xl object-cover" priority />
          <span className="text-xl font-extrabold! tracking-tight">
            Studio<span className="text-primary">Space</span>
          </span>
        </Link>

        {/* Main navigation */}
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

        {user ? (
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1 pl-1 pr-3 shadow-sm transition-colors hover:border-[#1e97b3]">
              <Avatar className="h-8 w-8 border border-neutral-200 bg-neutral-100 ring-1 ring-white">
                {imageUrl ? <AvatarImage src={imageUrl} alt={user?.name || "User"} referrerPolicy="no-referrer" /> : null}
                <AvatarFallback>{user?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <span className="hidden max-w-24 truncate text-sm font-medium text-neutral-900 lg:inline">{user?.name?.trim().split(/\s+/)[0] || "User"}</span>
              <FaChevronDown className="size-3 text-neutral-500" aria-hidden="true" />
            </PopoverTrigger>
            <PopoverContent className="w-65 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
              <PopoverHeader>
                <PopoverDescription className="text-base text-neutral-500 -mb-1">Signed in as</PopoverDescription>
                <PopoverTitle className="text-lg font-bold text-black">{user?.name || "User"}</PopoverTitle>
                <PopoverDescription className="text-sm text-neutral-600 -mt-1">{user?.email || "user@example.com"}</PopoverDescription>
              </PopoverHeader>
              <div>
                <Link href="/profile" aria-label="Profile" className="flex items-center justify-center gap-2 border rounded-lg whitespace-nowrap text-lg font-semibold text-neutral-900 hover:border-[#1e97b3] shadow-sm py-2 transition-colors mt-2">
                  <FaUser className="text-base -mt-1 " />
                  <span className="hidden lg:inline">Profile</span>
                </Link>

                <Button type="button" onClick={handleSignOut} className="mt-4  bg-white flex cursor-pointer items-center gap-2 text-left text-lg text-[#f50039] transition-colors hover:bg-white hover:text-[#8b0524]">
                  <LogOut className="size-5.5" />
                  Sign Out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} title={isDark ? "Switch to light theme" : "Switch to dark theme"}>
              {isDark ? <Sun /> : <Moon />}
            </Button>
            <Button nativeButton={false} variant="outline" render={<Link href="/login" />} className="px-5.5 py-4.5 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground">
              Login
            </Button>
            <Button className="px-4.5 py-4.5 text-sm text-center font-medium hover:bg-dark-green dark:hover:bg-accent-lime dark:hover:text-accent-foreground" nativeButton={false} render={<Link href="/signup" />}>
              Register
            </Button>
          </div>
        )}

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
            <div className="mt-3 flex gap-2 border-t border-border/70 pt-4 lg:hidden">
              <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} title={isDark ? "Switch to light theme" : "Switch to dark theme"}>
                {isDark ? <Sun /> : <Moon />}
              </Button>
              <Button nativeButton={false} variant="outline" render={<Link href="/login" />} className="flex-1 px-5.5 py-4.5 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground">
                Login
              </Button>
              <Button nativeButton={false} render={<Link href="/signup" />} className="flex-1 px-4.5 py-4.5 text-sm text-center font-medium hover:bg-dark-green dark:hover:bg-accent-lime dark:hover:text-accent-foreground">
                Register
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};;;

export default Navbar;
