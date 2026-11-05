"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Eye, MapPin, X, XCircle } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import type { IBooking } from "@/lib/types/studiospace";

type BookingStatus = "Confirmed" | "Completed" | "Cancelled";

const DashboardView = ({ booking, hostEmail }: { booking: IBooking; hostEmail: string }) => {
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const normalizedStatus = booking.status?.toLowerCase() ?? "pending";

  const updateStatus = async (status: BookingStatus) => {
    setIsUpdating(true);

    try {
      const res = await fetch(`http://localhost:5000/dashboard/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, requesterEmail: hostEmail }),
      });

      const responseText = await res.text();
      let result: { message?: string };

      try {
        result = JSON.parse(responseText) as { message?: string };
      } catch {
        throw new Error(`Status update API returned an invalid response (${res.status}).`);
      }

      if (!res.ok) {
        throw new Error(result.message || "Failed to update booking status.");
      }

      toast.add({
        title: "Status updated",
        description: `${booking.title} is now ${status.toLowerCase()}.`,
        type: "success",
      });

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Status update failed",
        description: error instanceof Error ? error.message : "Something went wrong while updating the booking.",
        type: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={
          <Button type="button" variant="outline" size="sm" className="h-8 rounded-full border-primary/25 px-4 text-xs font-semibold text-primary-green hover:bg-primary/10">
            <Eye className="size-3.5" />
            View
          </Button>
        }
      />

      <AlertDialogContent className="rounded-2xl sm:max-w-md">
        <AlertDialogHeader className="relative pr-10">
          <AlertDialogTitle className="text-xl font-extrabold text-text-primary">{booking.title}</AlertDialogTitle>

          <AlertDialogDescription>Review this booking and update its status.</AlertDialogDescription>

          <Button type="button" variant="ghost" size="icon" onClick={() => setIsOpen(false)} disabled={isUpdating} className="absolute right-0 top-0 size-8 rounded-full text-text-secondary hover:bg-muted hover:text-text-primary">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </AlertDialogHeader>

        <div className="mt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary-green" />

              <div>
                <p className="text-xs text-text-secondary">Location</p>

                <p className="font-medium text-text-primary">{booking.location}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-text-secondary">Customer</p>

              <p className="font-medium text-text-primary">{booking.bookingUserName}</p>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="gap-2 sm:flex-row sm:justify-end">
          {normalizedStatus.includes("pending") && (
            <>
              <AlertDialogAction type="button" disabled={isUpdating} onClick={() => updateStatus("Cancelled")} className="bg-red-600 text-white hover:bg-red-700">
                <XCircle className="size-4" />
                Cancelled
              </AlertDialogAction>

              <AlertDialogAction type="button" disabled={isUpdating} onClick={() => updateStatus("Confirmed")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <CheckCircle2 className="size-4" />
                Confirmed
              </AlertDialogAction>
            </>
          )}

          {normalizedStatus.includes("confirm") && (
            <AlertDialogAction type="button" disabled={isUpdating} onClick={() => updateStatus("Completed")} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <CheckCircle2 className="size-4" />
              Completed
            </AlertDialogAction>
          )}

          {!normalizedStatus.includes("pending") && !normalizedStatus.includes("confirm") && (
            <p className="text-sm text-text-secondary">No further status updates are available.</p>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DashboardView;
