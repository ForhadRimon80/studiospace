import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Film, LayoutDashboard, Plus, Sparkles, Users } from "lucide-react";
import DashboardView from "@/components/dashboard/DashboardView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import type { IBooking } from "@/lib/types/studiospace";


const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  const res = await fetch(`http://localhost:5000/dashboard/${encodeURIComponent(user.email)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data = await res.json();

  const userBookings: IBooking[] = data.userBookings || [];
  const totalStudios: number = data.totalStudios || 0;

  const pendingBookings = userBookings.filter((booking) => booking.status?.toLowerCase().includes("pending")).length;
  const confirmedBookings = userBookings.filter((booking) => booking.status?.toLowerCase().includes("confirm")).length;


  const stats = [
    {
      label: "Total Studios",
      helper: "Studio spaces published",
      value: totalStudios,
      icon: Film,
      iconClass: "bg-light-green text-primary-green dark:bg-primary-green/20 dark:text-accent-lime",
    },
    {
      label: "Total Bookings",
      helper: "All reservation requests",
      value: userBookings.length,
      icon: CalendarDays,
      iconClass: "bg-accent-lime/40 text-dark-green dark:bg-accent-lime/20 dark:text-accent-lime",
    },
    {
      label: "Pending Bookings",
      helper: "Waiting for your review",
      value: pendingBookings,
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
    },
    {
      label: "Confirmed Bookings",
      helper: "Locked in and ready",
      value: confirmedBookings,
      icon: CheckCircle2,
      iconClass: "bg-primary-green/10 text-primary-green dark:bg-primary-green/20 dark:text-accent-lime",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-light-green px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-green dark:bg-primary-green/15 dark:text-accent-lime">
            <LayoutDashboard className="size-3.5" />
            Host Dashboard
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Welcome back, <span className="text-primary-green dark:text-accent-lime">{user.name?.trim().split(" ")[0] || "Host"}</span>!
          </h1>

          <p className="mt-1 text-sm text-text-secondary">Here&apos;s what&apos;s happening with your studio business.</p>
        </div>

        <Button nativeButton={false} render={<Link href="/add-new-studio" />} className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" />
          Add New Studio
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, helper, value, icon: Icon, iconClass }) => (
          <Card key={label} className="rounded-2xl border-0 bg-bg-surface p-0 shadow-sm ring-1 ring-border/70">
            <CardContent className="p-5">
              <span className={`grid size-11 place-items-center rounded-xl ${iconClass}`}>
                <Icon className="size-5" />
              </span>

              <p className="mt-4 text-3xl font-extrabold leading-none text-text-primary">{value}</p>

              <p className="mt-1.5 text-sm font-semibold text-text-primary">{label}</p>

              <p className="mt-0.5 text-xs text-text-secondary">{helper}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="relative overflow-hidden rounded-3xl border-0 bg-linear-to-r from-dark-green via-primary-green to-primary-green p-0 text-white shadow-lg shadow-primary/20">
        <div className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-accent-lime/20 blur-2xl" />

        <div className="pointer-events-none absolute -bottom-24 right-1/3 size-56 rounded-full bg-accent-lime/10 blur-2xl" />

        <CardContent className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-lime">
              <Sparkles className="size-3.5" />
              Grow your portfolio
            </span>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">Grow Your Business</h2>

            <p className="mt-2 text-sm leading-6 text-white/80">Publish another studio space and reach more creative teams looking for the perfect place to shoot.</p>

            <Button nativeButton={false} render={<Link href="/add-new-studio" />} className="mt-5 h-10 rounded-full bg-accent-lime px-5 text-sm font-bold text-dark-green hover:bg-accent-lime/90">
              <Plus className="size-4" />
              Add New Studio
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/20 md:h-40 md:w-72">
            <Image src="/images/banner-1.png" alt="Creative studio photography setup" fill unoptimized sizes="(min-width: 768px) 288px, 100vw" className="object-cover" />

            <div className="absolute inset-0 bg-linear-to-t from-dark-green/40 to-transparent md:bg-linear-to-r" />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 bg-bg-surface p-0 shadow-sm ring-1 ring-border/70">
        <CardContent className="p-0">
          <div className="border-b border-border px-5 py-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary">
                <Users className="size-5 text-primary-green dark:text-accent-lime" />
                Recent Bookings
              </h2>

              <p className="mt-1 text-xs text-text-secondary">Manage booking requests from your studios.</p>
            </div>
          </div>

          {userBookings.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-14 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-light-green text-primary-green dark:bg-primary-green/15 dark:text-accent-lime">
                <CalendarDays className="size-7" />
              </span>

              <h3 className="mt-4 text-base font-bold text-text-primary">No bookings yet</h3>

              <p className="mt-1 max-w-sm text-sm text-text-secondary">New reservation requests for your studios will appear here.</p>

              <Button nativeButton={false} render={<Link href="/my-studio-listings" />} className="mt-5 h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Manage My Studios
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-205 text-left text-sm">
                <thead className="border-b border-border bg-muted/30 text-[11px] uppercase tracking-wide text-text-secondary">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Studio</th>

                    <th className="px-5 py-3 font-semibold">Customer</th>

                    <th className="px-5 py-3 font-semibold">Date &amp; Time</th>

                    <th className="px-5 py-3 font-semibold">Amount</th>

                    <th className="px-5 py-3 font-semibold">Status</th>

                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {userBookings.map((booking) => {

                    return (
                      <tr key={booking._id} className="transition-colors hover:bg-muted/20">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-muted">
                              <Image src={booking.imageUrl} alt={booking.title} fill unoptimized sizes="44px" className="object-cover" />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-47.5 truncate font-semibold text-text-primary">{booking.title}</p>

                              <p className="text-xs text-text-secondary">{booking.category || "Studio"}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3">
                          <p className="truncate font-medium text-text-primary">{booking.bookingUserName}</p>
                        </td>

                        <td className="px-5 py-3 text-text-secondary">
                          <p className="font-medium text-text-primary">{formatBookingDate(booking.shootDate)}</p>

                          <p className="text-xs">
                            {booking.startTime} – {booking.endTime}
                          </p>
                        </td>

                        <td className="px-5 py-3">
                          <p className="font-bold text-text-primary">${booking.totalCost}</p>

                          <p className="text-xs text-text-secondary">{booking.durationHours} hrs</p>
                        </td>

                        <td className="px-5 py-3">
                          <StatusBadge status={booking.status} />
                        </td>

                        <td className="px-5 py-3 text-right">
                          <DashboardView booking={booking} hostEmail={user.email} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function formatBookingDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const isCancelled = status?.toLowerCase().includes("cancel");
  const isConfirmed = status?.toLowerCase().includes("confirm");

  const styles = isCancelled ? "bg-red-50 text-red-600 ring-red-200 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/30" : isConfirmed ? "bg-light-green text-primary-green ring-primary-green/20 dark:bg-primary-green/15 dark:text-accent-lime dark:ring-primary-green/30" : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${styles}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {status || "Pending"}
    </span>
  );
}

export default DashboardPage;
