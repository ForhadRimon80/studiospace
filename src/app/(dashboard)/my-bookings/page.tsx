import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowRight, CalendarDays } from "lucide-react";

import MyBookingsCard from "@/components/dashboard/MyBookingsCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { serverApiFetch } from "@/lib/api-server";
import type { IBooking } from "@/lib/types/studiospace";

const MyBookingsPage = async () => {
  // Get the current session and user information (server side)
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  const res = await serverApiFetch(`/bookings/${encodeURIComponent(user.email)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const data = await res.json();
  const bookings: IBooking[] = Array.isArray(data) ? data : [];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-light-green px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-green dark:bg-primary-green/15 dark:text-accent-lime">
            <CalendarDays className="size-3.5" />
            Production Schedule
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            My Studio <span className="text-primary-green dark:text-accent-lime">Bookings</span>
          </h1>

          <p className="mt-1 text-sm text-text-secondary">Track reservation statuses, cancellation requests, and shoot times.</p>
        </div>

        <Button nativeButton={false} render={<Link href="/studios" />} className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Explore More Studios
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <MyBookingsCard bookings={bookings} />
    </div>
  );
};

export default MyBookingsPage;
