"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, LayoutDashboard, CirclePlus, LogOut, Heart, X, House, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }: DashboardSidebarProps) => {
    const pathname = usePathname();

  const navLinks = [
    { label: "Home", icon: House, href: "/" },
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Add New Studio", icon: CirclePlus, href: "/add-new-studio" },
    { label: "My Listings", icon: Building2, href: "/dashboard/my-listings" },
    { label: "My Bookings", icon: CalendarDays, href: "/dashboard/my-bookings" },
    { label: "Saved Wishlist", icon: Heart, href: "/dashboard/profile" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && <button type="button" onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-label="Close sidebar" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-[#064e32] text-white transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Profile */}
        <div className="relative px-6 py-8 text-center">
          {/* Close Sidebar */}
          <Button type="button" variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="absolute right-3 top-3 text-white hover:bg-white/10 hover:text-white lg:hidden">
            <X />
          </Button>

          <Avatar className="mx-auto size-14 border-2 border-white/70">
            <AvatarImage src="/images/logo.png" alt="Rimon Ahmed" />
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>

          <p className="mt-2 text-sm font-semibold">Rimon Ahmed</p>
          <p className="text-xs text-white/75">Studio Owner</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-3 text-sm font-medium">
          {navLinks.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;

            return (
              <Link key={label} href={href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-colors ${isActive ? "bg-[#0a9b50] text-white" : "text-white/90 hover:bg-white/10"}`}>
                <Icon className="size-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button type="button" className="mt-auto flex items-center gap-4 px-7 py-7 text-sm font-medium text-white/90 hover:text-white">
          <LogOut className="size-5" />
          Logout
        </button>
      </aside>
    </>
  );
};

export default DashboardSidebar;
