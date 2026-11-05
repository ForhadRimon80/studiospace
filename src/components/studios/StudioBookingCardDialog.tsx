"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { IStudio } from "@/lib/types/studiospace";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";
import { usePathname, useRouter } from "next/navigation";

const fieldClassName = "h-11 rounded-xl border-border bg-bg-page px-3 text-sm shadow-none";

function timeToMinutes(value: string) {
  const [hours = "0", minutes = "0"] = value.split(":");
  return Number(hours) * 60 + Number(minutes);
}

function formatMoney(value: number) {
  return `$${value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

const StudioBookingCardDialog = ({ studio, rating }: { studio: IStudio; rating: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shootDate, setShootDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [crewCount, setCrewCount] = useState("0");
  const [notes, setNotes] = useState("");

  const hourlyRate = Number(studio.hourlyRate) || 0;
  const securityDeposit = Number(studio.securityDeposit) || 0;

  const durationHours = Math.max((timeToMinutes(endTime) - timeToMinutes(startTime)) / 60, 0);

  const subtotal = hourlyRate * durationHours;
  const total = subtotal + securityDeposit;

  const durationLabel = Number.isInteger(durationHours) ? durationHours : durationHours.toFixed(1);

  // Get the current session and user information (client side)
  const { data: session } = useSession();
  const user = session?.user;

  const handleBookingTrigger = () => {
    if (!user) {
      const callbackURL = `${pathname}?booking=login`;
      router.push(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);
      return;
    }

    setOpen(true);
  };

  // Handle booking form submission
  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate booking time
    if (durationHours <= 0) {
      toast.add({
        title: "Invalid time range",
        description: "End time must be after start time.",
        type: "error",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());


    const updatedData = {
      bookingUserName: user?.name || "Guest",
      bookingUserEmail: user?.email || "guest@example.com",
      ...data,
      status: "Pending",
      ...studio,
      totalCost: total,
      durationHours: durationHours,
    };

    try {
      // Send the data to the backend
      const res = await apiFetch("/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit booking request");
      }

      await res.json();

      toast.add({
        title: "Booking request sent",
        description: `${studio.hostName} will confirm your slot for ${studio.title} shortly.`,
        type: "success",
      });
      setOpen(false);
      router.push("/my-bookings");

    } catch (error) {
      console.error("Booking error:", error);

      toast.add({
        title: "Booking failed",
        description: "Something went wrong Please try again or you already have a booking for this Studio.",
        type: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" onClick={handleBookingTrigger} className="mt-6 h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90" />
        }
      >
        <CalendarDays className="size-4" />
        Book Workspace Now
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-6 scrollbar-none [&::-webkit-scrollbar]:hidden sm:max-w-xl">
        <DialogHeader className="gap-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-green dark:text-accent-lime">Reserve Creative Slot</p>

          <DialogTitle className="text-2xl font-extrabold leading-tight text-text-primary">{studio.title}</DialogTitle>

          <DialogDescription className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
            <span>Rate: ${studio.hourlyRate}/hr</span>
            <span aria-hidden="true">&bull;</span>
            <span>Deposit: ${studio.securityDeposit}</span>

            <span className="inline-flex items-center gap-1 font-semibold text-text-primary">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {rating}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBookingSubmit} className="mt-2 space-y-5">
          {/* Shoot date */}
          <div className="space-y-2">
            <Label htmlFor="shoot-date" className="text-sm font-semibold text-text-primary">
              Shoot Date
            </Label>

            <Input id="shoot-date" name="shootDate" type="date" required value={shootDate} onChange={(event) => setShootDate(event.target.value)} className={fieldClassName} />
          </div>

          {/* Start and end time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-time" className="text-sm font-semibold text-text-primary">
                Start Time
              </Label>

              <Input id="start-time" name="startTime" type="time" required value={startTime} onChange={(event) => setStartTime(event.target.value)} className={fieldClassName} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-time" className="text-sm font-semibold text-text-primary">
                End Time
              </Label>

              <Input id="end-time" name="endTime" type="time" required value={endTime} onChange={(event) => setEndTime(event.target.value)} className={fieldClassName} />
            </div>
          </div>

          {/* Crew count */}
          <div className="space-y-2">
            <Label htmlFor="crew-count" className="text-sm font-semibold text-text-primary">
              Expected Crew / Talent Count (Max {studio.maxCapacity})
            </Label>

            <Input id="crew-count" name="crewCount" type="number" min="1" max={studio.maxCapacity} required value={crewCount} onChange={(event) => setCrewCount(event.target.value)} className={fieldClassName} />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="booking-notes" className="text-sm font-semibold text-text-primary">
              Production Requirements / Gear Notes <span className="font-normal text-text-secondary">(Optional)</span>
            </Label>

            <Textarea id="booking-notes" name="notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="e.g. Bringing high-output lighting, smoke machine, heavy rigging..." className="min-h-24 resize-none rounded-xl border-border bg-bg-page px-3 py-2 text-sm shadow-none placeholder:text-text-secondary/70" />
          </div>

          {/* Cost summary */}
          <div className="rounded-xl border border-border bg-muted/60 p-4 text-sm">
            <div className="flex items-center justify-between gap-4 text-text-secondary">
              <span>
                {formatMoney(hourlyRate)} &times; {durationLabel} shoot hours
              </span>

              <span className="font-medium text-text-primary">{formatMoney(subtotal)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-4 text-text-secondary">
              <span>Refundable Security Deposit</span>

              <span className="font-medium text-text-primary">{formatMoney(securityDeposit)}</span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 border-t border-border pt-3">
              <span className="font-bold text-text-primary">Total Estimated Cost</span>

              <span className="text-lg font-extrabold text-primary-green dark:text-accent-lime">{formatMoney(total)}</span>
            </div>
          </div>

          {/* Submit booking */}
          <Button type="submit" className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Sparkles className="size-4" />
            Confirm &amp; Send Booking Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudioBookingCardDialog;
