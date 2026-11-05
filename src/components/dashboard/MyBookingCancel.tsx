"use client";

import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { IBooking } from "@/lib/types/studiospace";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { apiFetch } from "@/lib/api-client";

const MyBookingCancel = ({ booking }: { booking: IBooking }) => {
  const router = useRouter();

  const handleCancelBooking = async () => {
    try {
      const res = await apiFetch(`/dashboard/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Cancelled",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message ?? "Booking could not be cancelled.");
      }

      toast.add({
        title: "Cancellation successful",
        description: "The booking has been cancelled.",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Cancellation failed",
        description: error instanceof Error ? error.message : "Something went wrong while cancelling the booking.",
        type: "error",
      });
    }
  };

  return (
    <Button
      type="button"
      disabled={!booking.status?.toLowerCase().includes("pending")}
      variant="outline"
      onClick={handleCancelBooking}
      className="h-9 rounded-full border-red-200 bg-red-50/60 px-4 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
    >
        <XCircle className="size-3.5" />
        Cancel Booking
    </Button>
  );
};

export default MyBookingCancel;