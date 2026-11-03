"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X, LogOut, CirclePlus, Building2, CalendarDays, Heart, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaChevronDown } from "react-icons/fa";

// Navigation items
const navigation = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
];

// Check active route
const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return href.startsWith("/#") ? false : pathname.startsWith(href);
};

// Get valid image URL
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

  // Get current session
  const { data: session } = useSession();

  const user = session?.user;
  const imageUrl = getImageUrl(user?.image);

  // Handle sign out
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

  // Select navigation item
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

  // Navigation link
  const renderNavigation = (mobile = false) =>
    navigation.map((item) => {
      const active = selectedHref === item.href || (selectedHref === null && isActiveRoute(pathname, item.href));

      return (
        <Link key={item.label} href={item.href} className={`rounded-lg ${mobile ? "px-3 py-2.5 text-[15px]" : "px-3.5 py-2 text-[15px]"} font-bold transition-colors ${active ? "bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent-lime" : "text-foreground hover:bg-muted"}`} aria-current={active ? "page" : undefined} onClick={() => selectNavigationItem(item.href)}>
          {item.label}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      {/* Main Navbar */}
      <div className="container mx-auto grid h-18 grid-cols-3 items-center px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        {/* Left: Hamburger (Mobile & Tablet) */}
        <Button variant="ghost" size="icon" className="col-start-1 justify-self-start lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Logo: Center on Mobile, Left on Desktop */}
        <Link href="/" className="col-start-2 flex items-center justify-self-center gap-2.5 whitespace-nowrap lg:col-start-1 lg:justify-self-start" onClick={closeMenu} aria-label="StudioSpace home">
          <Image src="/images/logo.png" alt="StudioSpace" width={42} height={42} className="size-9 rounded-xl object-cover sm:size-10" priority />

          <span className="text-lg font-extrabold tracking-tight sm:text-xl">
            Studio<span className="text-primary">Space</span>
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center justify-center gap-3 lg:col-start-2 lg:flex" aria-label="Main navigation">
          {renderNavigation()}
        </nav>

        {/* Right: User Profile / Authentication */}
        <div className="col-start-3 flex items-center justify-self-end gap-2">
          {user ? (
            <Popover>
              <PopoverTrigger className="flex items-center justify-self-end gap-2 rounded-full border border-neutral-200 bg-white p-1 shadow-sm transition-colors hover:border-[#1e97b3] dark:border-border dark:bg-bg-page">
                <Avatar className="size-9 border border-neutral-200 bg-neutral-100 dark:border-border dark:bg-bg-page">
                  {imageUrl ? <AvatarImage src={imageUrl} alt={user?.name || "User"} referrerPolicy="no-referrer" /> : null}

                  <AvatarFallback>{user?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>

                <span className="hidden max-w-24 truncate text-sm font-medium text-neutral-900 lg:inline dark:text-foreground">{user?.name?.trim().split(/\s+/)[0] || "User"}</span>

                <FaChevronDown className="hidden size-3 text-neutral-500 lg:inline dark:text-muted-foreground" />
              </PopoverTrigger>

              <PopoverContent className="w-65 rounded-lg border border-neutral-200 bg-white p-4 text-neutral-900 shadow-lg dark:border-border dark:bg-bg-page dark:text-foreground">
                <PopoverHeader>
                  <div className="flex items-center justify-between">
                    <PopoverDescription className="text-base text-neutral-500 dark:text-muted-foreground">Signed in as</PopoverDescription>

                    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>
                      {isDark ? <Sun /> : <Moon />}
                    </Button>
                  </div>

                  <PopoverTitle className="text-lg font-bold text-black dark:text-foreground">{user?.name || "User"}</PopoverTitle>

                  <PopoverDescription className="text-sm text-neutral-600 dark:text-muted-foreground">{user?.email || "user@example.com"}</PopoverDescription>
                </PopoverHeader>

                <div>
                  <div>
                    <Link href="/dashboard" className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-base font-sm! text-neutral-900  transition-colors dark:text-foreground hover:bg-primary/10  hover:dark:bg-accent/20">
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                    <Link href="/add-new-studio" className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-base font-sm! text-neutral-900  transition-colors dark:text-foreground hover:bg-primary/10  hover:dark:bg-accent/20">
                      <CirclePlus className="size-4" />
                      Add New Studio
                    </Link>
                    <Link href="/my-studio-listings" className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-base font-sm! text-neutral-900  transition-colors dark:text-foreground hover:bg-primary/10  hover:dark:bg-accent/20">
                      <Building2 className="size-4" />
                      My Studio Listings
                    </Link>
                    <Link href="/my-bookings" className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-base font-sm! text-neutral-900  transition-colors dark:text-foreground hover:bg-primary/10  hover:dark:bg-accent/20">
                      <CalendarDays className="size-4" />
                      My Bookings
                    </Link>
                    <Link href="/save-wishlist" className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-base font-sm! text-neutral-900  transition-colors dark:text-foreground hover:bg-primary/10  hover:dark:bg-accent/20">
                      <Heart className="size-4" />
                      Saved Wishlist
                    </Link>
                  </div>
                  <Button type="button" variant="outline" onClick={handleSignOut} className="mt-4 py-5 text-[#f50039] border hover:border-[#db0638] bg-white transition-colors  dark:hover:border-[#db0638] flex w-full cursor-pointer items-center justify-center gap-2 text-lg hover:bg-white hover:text-[#b1072e]">
                    <LogOut className="size-5" />
                    Log Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              {/* Desktop Actions */}
              <div className="hidden items-center gap-2 lg:flex">
                <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>
                  {isDark ? <Sun /> : <Moon />}
                </Button>

                <Button nativeButton={false} variant="outline" render={<Link href="/login" />} className="px-5.5 py-4.5 text-sm font-medium text-foreground hover:bg-muted">
                  Login
                </Button>

                <Button nativeButton={false} render={<Link href="/signup" />} className="px-4.5 py-4.5 text-sm font-medium">
                  Register
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t border-border/70 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
            {renderNavigation(true)}

            {!user && (
              <div className="mt-3 flex gap-2 border-t border-border/70 pt-4 lg:hidden">
                <Button nativeButton={false} variant="outline" render={<Link href="/login" />} className="flex-1 px-5.5 py-4.5 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground">
                  Login
                </Button>
                <Button nativeButton={false} render={<Link href="/signup" />} className="flex-1 px-4.5 py-4.5 text-sm text-center font-medium hover:bg-dark-green dark:hover:bg-accent-lime dark:hover:text-accent-foreground">
                  Register
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
