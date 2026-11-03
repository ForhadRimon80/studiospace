"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, Menu } from "lucide-react";

interface DashboardNavbarProps {
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardNavbar = ({ setIsSidebarOpen }: DashboardNavbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#e2e8e5] bg-white/95 px-5 backdrop-blur sm:px-8">
      {/* Mobile Menu */}
      <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar">
        <Menu />
      </Button>

      {/* Search */}
      <div className="relative max-w-70 flex-1">
        <Input placeholder="Search anything..." className="h-9 rounded-full border-[#dce6e1] bg-white pl-10 text-xs" />

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#80918b]">⌕</span>
      </div>

      {/* Theme */}
      <Button type="button" variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Toggle theme">
        ☼
      </Button>

      {/* User */}
      <Avatar className="size-8 border border-[#d8e5df]">
        <AvatarImage src="/images/logo.png" alt="Rimon Ahmed" />
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>

      <ChevronDown className="size-4 text-[#61736c]" />
    </header>
  );
};

export default DashboardNavbar;
