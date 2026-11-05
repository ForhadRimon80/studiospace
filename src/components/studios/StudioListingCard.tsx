"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import type { IStudio } from "@/lib/types/studiospace";

// Demo Rating
function getRating(id: string) {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return (4 + (sum % 10) / 10).toFixed(1);
}

export default function StudioListingCard({ studio }: { studio: IStudio }) {
  const [saved, setSaved] = useState(false);

  // Wishlist Toggle
  const toggleSaved = () => {
    const nextSaved = !saved;

    setSaved(nextSaved);

    toast.add({
      title: nextSaved ? "Saved to wishlist" : "Removed from wishlist",
      description: nextSaved ? `${studio.title} is now in your saved spaces.` : `${studio.title} was removed from your saved spaces.`,
      type: nextSaved ? "success" : "error",
    });
  };

  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden border-0 bg-bg-surface p-0 shadow-sm ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Studio Image */}
      <div className="relative h-48 overflow-hidden">
        <Image src={studio.imageUrl} alt={studio.title} fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />

        {/* Category */}
        <span className="absolute bottom-3 left-3 rounded-full bg-accent-lime px-3 py-1 text-[11px] font-semibold text-dark-green shadow-sm">{studio.category}</span>

        {/* Wishlist */}
        <button type="button" onClick={toggleSaved} aria-label={saved ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={saved} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-neutral-600 shadow-sm transition hover:bg-white hover:text-primary-green">
          <Heart className={`size-4 ${saved ? "fill-primary-green text-primary-green" : ""}`} />
        </button>
      </div>

      {/* Studio Information */}
      <CardContent className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-10 text-base font-bold leading-snug text-text-primary">{studio.title}</h3>

        {/* Rating and Location */}
        <div className="mt-1.5 flex items-center gap-1 text-xs text-text-secondary">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />

          <span className="font-semibold text-text-primary">{getRating(studio._id)}</span>

          <span className="mx-1 text-border">|</span>

          <MapPin className="size-3.5 shrink-0" />

          <span>{studio.location}</span>
        </div>

        {/* Price and Details */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <p className="text-lg font-extrabold text-primary dark:text-accent-lime">
            ${studio.hourlyRate}
            <span className="ml-1 text-xs font-medium text-primary dark:text-accent-lime">/ hr</span>
          </p>

          <Button nativeButton={false} variant="outline" size="sm" render={<Link href={`/studios/${studio._id}`} />} className="h-8 rounded-full border-primary/25 bg-primary/5 px-4 text-xs font-semibold text-primary-green hover:bg-primary/10">
            View Details
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
