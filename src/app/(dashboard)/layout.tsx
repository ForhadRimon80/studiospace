"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7faf9] text-[#132330] dark:bg-bg-page dark:text-foreground">
      <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="lg:pl-70">
        <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="min-h-[calc(100vh-4rem)] p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
