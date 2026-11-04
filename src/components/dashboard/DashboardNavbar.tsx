"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Menu, Moon, Sun, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardNavbarProps {
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardNavbar = ({ setIsSidebarOpen }: DashboardNavbarProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("studiospace-theme");
    const shouldUseDark = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frameId = window.requestAnimationFrame(() => setIsDark(shouldUseDark));

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("studiospace-theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#e2e8e5] bg-white/95 px-5 backdrop-blur dark:border-border dark:bg-background/95 sm:px-8">
      {/* Mobile Menu */}
      <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar">
        <Menu />
      </Button>

      <div className="flex w-full items-center justify-between gap-4">
        {/* Search - Left */}
        <div className="relative w-full max-w-90">
          <Input placeholder="Search anything..." className="h-9 w-full rounded-full border-[#dce6e1] bg-white pl-10 text-xs dark:border-border dark:bg-bg-surface dark:text-foreground dark:placeholder:text-muted-foreground" />

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#80918b] size-5" />
        </div>

        {/* Theme - Right */}
        <Button type="button" variant="ghost" size="icon" className="shrink-0 boder border-[#dce6e1] hover:bg-[#f0f3f5] dark:border-border dark:hover:bg-bg-surface" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>
          {isDark ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
