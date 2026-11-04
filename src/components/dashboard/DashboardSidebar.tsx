"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, LayoutDashboard, CirclePlus, LogOut, Heart, X, House, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

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

const DashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;
  const imageUrl = getImageUrl(user?.image);
  // console.log(user);

  const navLinks = [
    { label: "Home", icon: House, href: "/" },
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Add New Studio", icon: CirclePlus, href: "/add-new-studio" },
    { label: "My Studio Listings", icon: Building2, href: "/my-studio-listings" },
    { label: "My Bookings", icon: CalendarDays, href: "/my-bookings" },
    { label: "Saved Wishlist", icon: Heart, href: "/saved-wishlist" },
  ];

  // Handle sign out
  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.add({
        title: "SignOut failed",
        description: error instanceof Error ? error.message : "Something went wrong while signOut.",
        type: "error",
      });
      return;
    }
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && <button type="button" onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-label="Close sidebar" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex h-dvh max-h-dvh w-70 flex-col overflow-hidden bg-[#064e32] text-white transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Profile */}
        <div className="relative px-6 py-8 text-center">
          {/* Close Sidebar */}
          <Button type="button" variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="absolute right-3 top-3 text-white hover:bg-white/10 hover:text-white lg:hidden">
            <X />
          </Button>

          <Avatar className="mx-auto size-14 border-2 border-white/70 bg-neutral-100 dark:border-border dark:bg-bg-page">
            {imageUrl ? <AvatarImage src={imageUrl} alt={user?.name || "User"} referrerPolicy="no-referrer" /> : null}

            <AvatarFallback>{user?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>

          <p className="mt-2 text-sm font-semibold">{user?.name || "User"}</p>
          <p className="text-xs text-white/75">{user?.email || "example@gmail.com"}</p>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 text-sm font-medium">
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
        <Button type="button" onClick={handleSignOut} className="mt-4 mb-6 mx-4 shrink-0 flex items-center gap-2 py-5 text-sm font-medium text-white/90 hover:text-white dark:text-black/90">
          <LogOut className="size-4.5 mt-0.5" />
          Logout
        </Button>
      </aside>
    </>
  );
};

export default DashboardSidebar;
