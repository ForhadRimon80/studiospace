"use client";

import Image from "next/image";
import { AudioLines, Camera, Clapperboard, LayoutGrid, MicVocal, Music4, Palette, PartyPopper, PersonStanding, Shirt, SlidersHorizontal, Sparkles, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "cn";

import type { IStudio } from "@/lib/types/studiospace";

import StudioListingCard from "./StudioListingCard";

// Category Icon
const categoryIcons: Record<string, LucideIcon> = {
  "Photography Studio": Camera,
  "Film & Video Studio": Clapperboard,
  "Podcast Room": MicVocal,
  "Audio/Voice Studio": AudioLines,
  "Music Studio": Music4,
  "Art & Workshop Studio": Palette,
  "Creative Space/Loft": Sparkles,
  "Dance Studio": PersonStanding,
  "Event Space": PartyPopper,
  "Fashion Studio": Shirt,
};

// Category-Order
const preferredCategoryOrder = Object.keys(categoryIcons);

// Category Icon
function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] ?? LayoutGrid;
}

//Unique Category
function getCategories(studios: IStudio[]) {
  const categories = [...new Set(studios.map((studio) => studio.category))];

  return categories.sort((a, b) => {
    const aIndex = preferredCategoryOrder.indexOf(a);
    const bIndex = preferredCategoryOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
}

export default function StudiosExplorer({ studios, initialCategory }: { studios: IStudio[]; initialCategory?: string }) {
  // Categories
  const categories = useMemo(() => getCategories(studios), [studios]);

  // Category State
  const [category, setCategory] = useState(() => {
    if (!initialCategory) return "all";

    return categories.find((item) => item.toLowerCase() === initialCategory.toLowerCase()) ?? "all";
  });

  // Category Filter
  const filteredStudios = studios.filter((studio) => category === "all" || studio.category === category);

  // Category Select
  const selectCategory = (value: string) => {
    setCategory(value);
  };

  // Clear Filter
  const clearFilters = () => {
    setCategory("all");
  };

  return (
    <>
      {/* Header Section */}
      <section className="relative overflow-hidden border-b border-border/60 bg-linear-to-b from-light-green/50 to-bg-page dark:from-bg-surface dark:to-bg-page">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-16 size-80 rounded-full bg-light-green/80 blur-3xl dark:bg-primary-green/10" />

        <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-accent-lime/40 blur-3xl dark:bg-accent-lime/10" />

        <div className="container relative mx-auto grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-green dark:text-accent-lime">Full marketplace catalogue</p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
              Explore <span className="text-primary-green dark:text-accent-lime">Creative Studios</span>
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-text-secondary">Discover amazing spaces for your next project like sound stages, photography cycloramas, podcast hubs and mixing rooms.</p>

          </div>

          {/* Header Image */}
          <div className="relative hidden h-52 overflow-hidden rounded-[2rem] border border-border/70 bg-muted shadow-2xl shadow-primary/10 lg:block">
            <Image src="/images/common.png" alt="Professional photography studio with lighting and camera equipment" fill priority sizes="45vw" className="object-cover" />

            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="container mx-auto px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="rounded-2xl border border-border bg-bg-surface p-4 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-bold text-text-primary">
            <SlidersHorizontal className="size-4 text-primary-green dark:text-accent-lime" />
            Filter by Category
          </h2>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin" role="group" aria-label="Filter studios by category">
            {/* All Studios */}
            <button type="button" onClick={() => selectCategory("all")} aria-pressed={category === "all"} className={cn("inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition", category === "all" ? "border-primary bg-primary font-semibold text-primary-foreground" : "border-border bg-bg-page text-text-secondary hover:border-primary/40 hover:text-text-primary")}>
              <LayoutGrid className="size-4 shrink-0" />
              All Studios
            </button>

            {/* All Categories */}
            {categories.map((value) => {
              const Icon = getCategoryIcon(value);

              return (
                <button key={value} type="button" onClick={() => selectCategory(value)} aria-pressed={category === value} className={cn("inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition", category === value ? "border-primary bg-primary font-semibold text-primary-foreground" : "border-border bg-bg-page text-text-secondary hover:border-primary/40 hover:text-text-primary")}>
                  <Icon className="size-4 shrink-0" />
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Listings */}
        <div className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl! font-extrabold tracking-tight text-text-primary">Studio Listings</h2>

            <p className="mt-1 text-xs text-text-secondary">{filteredStudios.length > 0 ? `Showing ${filteredStudios.length} creative spaces` : "No creative spaces match this category"}</p>
          </div>

          {/* Studio Cards */}
          {filteredStudios.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredStudios.map((studio) => (
                <StudioListingCard key={studio._id} studio={studio} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-bg-surface py-12 text-center">
              <p className="font-semibold text-text-primary">No studios found</p>

              <p className="mt-2 text-sm text-text-secondary">Try a different category.</p>

              <button type="button" onClick={clearFilters} className="mt-4 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary-green">
                Show all studios
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
