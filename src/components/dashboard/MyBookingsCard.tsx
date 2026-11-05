"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, CalendarX2, Clock3, MapPin, Receipt, XCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { IBooking } from "@/lib/types/studiospace";
import MyBookingCancel from "./MyBookingCancel";

// Status Style
const getStatusStyle = (status: string): { badge: string; icon: LucideIcon } => {
  const value = status?.toLowerCase() ?? "";

  if (value.includes("pending")) {
    return {
      badge: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30",
      icon: Clock3,
    };
  }

  if (value.includes("confirm") || value.includes("approv")) {
    return {
      badge: "bg-light-green text-primary-green ring-primary-green/20 dark:bg-primary-green/15 dark:text-accent-lime dark:ring-primary-green/30",
      icon: CalendarDays,
    };
  }

  if (value.includes("cancel") || value.includes("declin") || value.includes("reject")) {
    return {
      badge: "bg-red-50 text-red-600 ring-red-200 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/30",
      icon: XCircle,
    };
  }

  return {
    badge: "bg-gray-50 text-gray-700 ring-gray-200 dark:bg-gray-500/15 dark:text-gray-300 dark:ring-gray-500/30",
    icon: Clock3,
  };
};

// Format Money
function formatMoney(value: number) {
  return `$${value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

// Short Booking ID
function shortId(id: string) {
  return id.slice(-6);
}

// Main Component
const MyBookingsCard = ({ bookings }: { bookings: IBooking[] }) => {
  const [receiptBooking, setReceiptBooking] = useState<IBooking | null>(null);

  // Empty State
  if (bookings.length === 0) {
    return (
      <Card className="rounded-2xl border border-dashed border-border bg-bg-surface p-0 shadow-none">
        <CardContent className="flex flex-col items-center px-6 py-14 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-light-green text-primary-green dark:bg-primary-green/15 dark:text-accent-lime">
            <CalendarX2 className="size-7" />
          </span>

          <h2 className="mt-4 text-lg font-bold text-text-primary">No bookings yet</h2>

          <p className="mt-1 max-w-sm text-sm text-text-secondary">Your studio reservations will appear here once you book a creative space.</p>

          <Button nativeButton={false} render={<Link href="/studios" />} className="mt-5 h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Explore Studios
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {bookings.map((booking) => {
          const statusStyle = getStatusStyle(booking.status);
          const StatusIcon = statusStyle.icon;

          return (
            <Card key={booking._id} className="rounded-2xl border-0 bg-bg-surface p-0 shadow-sm ring-1 ring-border/70 transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5">
                {/* Studio Image */}
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-36">
                  <Image src={booking.imageUrl} alt={booking.title} fill unoptimized sizes="144px" className="object-cover" />
                </div>

                {/* Booking Details */}
                <div className="min-w-0 flex-1">
                  {/* Status + ID */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${statusStyle.badge}`}>
                      <StatusIcon className="size-3.5" />

                      {booking.status}
                    </span>

                    <span className="text-[11px] font-medium text-text-secondary">ID: #{shortId(booking._id)}</span>
                  </div>

                  {/* Studio Name */}
                  <h2 className="mt-2 truncate text-base font-bold text-text-primary sm:text-lg">{booking.title}</h2>

                  {/* Date / Time / Location */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-secondary">
                    {/* Date */}
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />

                      {booking.shootDate?.slice(0, 10) || "—"}
                    </span>

                    {/* Time */}
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" />
                      {booking.startTime} – {booking.endTime} ({booking.durationHours} hrs)
                    </span>

                    {/* Location */}
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />

                      {booking.location}
                    </span>
                  </div>
                </div>

                {/* Price + Receipt Button */}
                <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                  {/* Total */}
                  <div className="sm:text-right">
                    <p className="text-[11px] font-medium text-text-secondary">Total Charged / Due</p>

                    <p className="text-xl font-extrabold text-primary-green dark:text-accent-lime">{formatMoney(Number(booking.totalCost))}</p>
                  </div>

                  {/* Receipt Button */}
                  <div className="flex">
                    <Button type="button" variant="outline" onClick={() => setReceiptBooking(booking)} className="h-9 rounded-full border-border bg-bg-surface px-4 text-xs font-semibold text-text-primary hover:bg-muted">
                      <Receipt className="size-3.5" />
                      Receipt
                    </Button>

                    <MyBookingCancel booking={booking} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      
      {/* Receipt Dialog */}
      <Dialog
        open={Boolean(receiptBooking)}
        onOpenChange={(open) => {
          if (!open) {
            setReceiptBooking(null);
          }
        }}>
        {receiptBooking && (
          <DialogContent className="rounded-2xl sm:max-w-md">

            {/* Receipt Header */}
            <DialogHeader className="gap-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-green dark:text-accent-lime">Booking Receipt</p>

              <DialogTitle className="text-lg font-extrabold leading-tight text-text-primary">{receiptBooking.title}</DialogTitle>

              <DialogDescription>ID: #{shortId(receiptBooking._id)}</DialogDescription>
            </DialogHeader>

            {/* Receipt Details */}
            <dl className="space-y-2.5 border-y border-border py-4 text-sm">

              {/* Shoot Date */}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-secondary">Shoot Date</dt>

                <dd className="font-medium text-text-primary">{receiptBooking.shootDate?.slice(0, 10) || "—"}</dd>
              </div>

              {/* Time */}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-secondary">Time</dt>

                <dd className="font-medium text-text-primary">
                  {receiptBooking.startTime} – {receiptBooking.endTime}
                </dd>
              </div>

              {/* Hourly Rate */}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-secondary">Hourly Rate</dt>

                <dd className="font-medium text-text-primary">
                  {formatMoney(Number(receiptBooking.hourlyRate))} × {receiptBooking.durationHours} hrs
                </dd>
              </div>

              {/* Security Deposit */}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-secondary">Security Deposit</dt>

                <dd className="font-medium text-text-primary">{formatMoney(Number(receiptBooking.securityDeposit))}</dd>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="font-bold text-text-primary">Total</dt>

                <dd className="text-lg font-extrabold text-primary-green dark:text-accent-lime">{formatMoney(Number(receiptBooking.totalCost))}</dd>
              </div>
            </dl>

            {/* Close Button */}
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={() => setReceiptBooking(null)} className="h-9 rounded-full px-5 text-sm">
                Close
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default MyBookingsCard;
