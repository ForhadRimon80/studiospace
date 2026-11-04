"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { IStudio } from "@/lib/types/studiospace";

export default function FeaturedStudioCard({ studio }: { studio: IStudio }) {
  const [saved, setSaved] = useState(false);

  // Deterministic pseudo-rating from the id (the API has no rating/review field)
  const rating = (id: string) => {
    const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return (4 + (sum % 10) / 10).toFixed(1);
  };

  const toggleSaved = () => {
    const nextSaved = !saved;
    setSaved(nextSaved);

    toast.add({
      title: nextSaved ? "Saved to wishlist" : "Removed from wishlist",
      description: nextSaved ? `${studio.title} is now in your saved spaces.` : `${studio.title} was removed from your saved spaces.`,
      type: "success",
    });
  };

  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden border-0 bg-bg-surface p-0 shadow-sm ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-36 overflow-hidden sm:h-32">
        <Image src={studio.imageUrl} alt={studio.title} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 16vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />

        <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-primary-green shadow-sm backdrop-blur">{studio.category}</span>

        <button type="button" onClick={toggleSaved} aria-label={saved ? `Remove ${studio.title} from wishlist` : `Save ${studio.title} to wishlist`} aria-pressed={saved} className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-neutral-600 shadow-sm transition hover:bg-white hover:text-primary-green">
          <Heart className={`size-4 ${saved ? "fill-primary-green text-primary-green" : ""}`} />
        </button>
      </div>

      <CardContent className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-9 text-[13px] font-bold leading-tight text-text-primary">{studio.title}</h3>

        <div className="mt-1 flex items-center gap-1 text-[11px] text-text-secondary">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-text-primary">{rating(studio._id)}</span>
        </div>

        <p className="mt-1 flex items-center gap-1 text-[11px] text-text-secondary">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{studio.location}</span>
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <p className="text-xs font-extrabold text-primary dark:text-accent-lime">
            ${studio.hourlyRate}
            <span className="ml-0.5 text-[10px] font-medium text-primary dark:text-accent-lime">/ hr</span>
          </p>

          <Button nativeButton={false} variant="outline" size="sm" render={<Link href={`/studios/${studio._id}`} />} className="h-7 rounded-full border-primary/25 bg-primary/5 px-2.5 text-[10px] font-semibold text-primary-green hover:bg-primary/10">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
