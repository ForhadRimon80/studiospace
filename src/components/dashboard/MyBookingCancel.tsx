"use client";
import { IBooking } from '@/lib/types/studiospace';
import React from 'react';
import { Button } from '../ui/button';
import { XCircle } from 'lucide-react';
import { useRouter } from "next/navigation";
import { toast } from '../ui/toast';

const MyBookingCancel = ({ booking } : { booking: IBooking }) => {

    const router = useRouter();

    const studioId = booking._id;
    console.log(studioId);
      const handleCancelBooking = async () => {
        // Send the data to the backend
        try {
          const res = await fetch(`http://localhost:5000/my-bookings/${studioId}`, {
            method: "DELETE",
          });

          // Get the response from the backend, convert it to JSON, and log the returned data.
          const afterDelete = await res.json();
          console.log("Data after submission:", afterDelete);

          if (!res.ok || !afterDelete.deletedCount) {
            throw new Error(afterDelete.message ?? "Booking could not be deleted.");
          } else {
            toast.add({
              title: "Deleting successful",
              description: "The booking has been successfully deleted.",
              type: "success",
            });
            router.refresh();
          }
        } catch (error) {
          toast.add({
            title: "Deleting failed",
            description: error instanceof Error ? error.message : "Something went wrong while deleting the booking.",
            type: "error",
          });
        }
      };

  return (
    <div>
      <Button type="button" variant="outline" onClick={handleCancelBooking} className="h-9 rounded-full border-red-200 bg-red-50/60 px-4 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20">
        <XCircle className="size-3.5" />
        Cancel Booking
      </Button>
    </div>
  );
};

export default MyBookingCancel;