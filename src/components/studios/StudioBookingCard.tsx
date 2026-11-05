import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { IStudio } from "@/lib/types/studiospace";

import StudioBookingCardDialog from "./StudioBookingCardDialog";

export default function StudioBookingCard({ studio, rating }: { studio: IStudio; rating: string }) {
  return (
    <Card className="gap-0 rounded-2xl py-0 shadow-lg shadow-primary/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-3xl font-extrabold text-primary-green dark:text-accent-lime">
            ${studio.hourlyRate}
            <span className="ml-1 text-sm font-medium text-text-secondary">/ hour</span>
          </p>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {rating}
          </span>
        </div>

        <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-secondary">Security Deposit</dt>
            <dd className="font-semibold text-text-primary">${studio.securityDeposit}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-secondary">Cancellation Policy</dt>
            <dd className="text-right font-semibold text-primary-green dark:text-accent-lime">Free before shoot confirmation</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-secondary">Availability</dt>
            <dd className="text-right font-semibold text-text-primary">Instant Request Slots</dd>
          </div>
        </dl>

        <StudioBookingCardDialog studio={studio} rating={rating} />

        <p className="mt-3 text-center text-[11px] leading-5 text-text-secondary">You won&apos;t be charged immediately. Your reservation will enter pending status for host approval.</p>
      </CardContent>
    </Card>
  );
}
