import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedStudioCard from "./FeaturedStudioCard";
import { IStudio } from "@/lib/types/studiospace";

const FeaturedStudios = ({studios}: {studios: IStudio[]}) => {
  return (
    <section id="featured-studios" className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-green dark:text-accent-lime">Hand-picked spaces</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">Featured Studios</h2>
          <p className="mt-1 text-sm text-text-secondary">The newest spaces listed by hosts on StudioSpace.</p>
        </div>

        <Link href="/studios" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-green transition hover:gap-2 dark:text-accent-lime">
          View all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {studios.map((studio) => (
          <FeaturedStudioCard key={studio._id} studio={studio} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedStudios;