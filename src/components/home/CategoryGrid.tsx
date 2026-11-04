import Link from "next/link";
import { ArrowRight, Camera, Clapperboard, MicVocal, Music4, Palette } from "lucide-react";
import { IStudio } from "@/lib/types/studiospace";

export default function CategoryGrid({ categories }: { categories: IStudio[] }) {
  
  const allCategories = [...new Set(categories.map((category) => category.category))];
  const categoriesList = allCategories.slice(0, 5);

  const category = [
    {
      label: categoriesList[0] || "Fashion Studio",
      value: "Fashion Studio",
      icon: Camera,
    },
    {
      label: categoriesList[1] || "Event Space",
      value: "Event Space",
      icon: Clapperboard,
    },
    {
      label: categoriesList[2] || "Dance Studio",
      value: "Dance Studio",
      icon: MicVocal,
    },
    {
      label: categoriesList[3] || "Creative Space/Loft",
      value: "Creative Space/Loft",
      icon: Music4,
    },
    {
      label: categoriesList[4] || "Film & Video Studio",
      value: "Film & Video Studio",
      icon: Palette,
    },
  ];

  return (
    <section id="categories" className="border-y border-border/60 bg-light-green/35 dark:bg-bg-surface">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-green dark:text-accent-lime">Find your fit</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">Browse by Studio Categories</h2>
          </div>

          <Link href="/studios" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-green transition hover:gap-2 dark:text-accent-lime">
            Explore all studios
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {category.map(({ label, value, icon: Icon }) => (
            <Link key={value} href={`/studios?category=${encodeURIComponent(value)}`} className="group flex items-center gap-3 rounded-2xl border border-border bg-bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-light-green text-primary-green transition group-hover:bg-primary group-hover:text-primary-foreground dark:bg-muted dark:text-accent-lime">
                <Icon className="size-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-text-primary">{label}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-text-secondary">
                  Explore
                  <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
