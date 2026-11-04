"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { IStudio } from "@/lib/types/studiospace";

const slides = [
  {
    src: "/images/banner-1.png",
    alt: "Bright photography studio with softboxes, a tripod and plants",
    label: "Photography studio",
  },
  {
    src: "/images/banner-2.png",
    alt: "Podcast studio with microphones, headphones and an ON AIR sign",
    label: "Podcast room",
  },
  {
    src: "/images/banner-3.png",
    alt: "Film studio with a green screen, camera rig and studio lighting",
    label: "Film stage",
  },
];

const HeroSlider = ({ studios }: { studios: IStudio[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Calculate the total number of unique categories from the studios data
  const categories = [...new Set(studios.map((studio) => studio.category))];
  const totalCategories = categories.length;

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) {
      return;
    }
    const timer = window.setInterval(() => api.scrollNext(), 5500);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-8 size-80 rounded-full bg-light-green/80 blur-3xl dark:bg-primary-green/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-32 size-72 rounded-full bg-accent-lime/50 blur-3xl dark:bg-accent-lime/10" />

      <div className="container relative mx-auto grid gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-green dark:text-accent-lime">Creative spaces for every story</p>

          <h1 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-tight text-text-primary sm:text-6xl xl:text-7xl">
            Create
            <br />
            Without <span className="text-primary-green dark:text-accent-lime">Limits.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-text-secondary">Find the perfect studio for your next creative project. Book photography sets, sound stages, podcast rooms and workshops by the hour.</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<Link href="/studios" />} className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Explore Studios
              <ArrowRight className="size-4" />
            </Button>

            <Button nativeButton={false} variant="outline" render={<Link href="/add-new-studio" />} className="h-11 rounded-full border-border bg-bg-surface px-6 text-sm font-semibold text-text-primary hover:bg-muted">
              Host Your Space
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/70 pt-6">
            <div>
              <dt className="text-xs font-medium text-text-secondary">Spaces</dt>
              <dd className="text-xl font-extrabold text-text-primary">{studios.length}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-text-secondary">Categories</dt>
              <dd className="text-xl font-extrabold text-text-primary">{totalCategories}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-text-secondary">Support</dt>
              <dd className="text-xl font-extrabold text-text-primary">24/7</dd>
            </div>
          </dl>
        </div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="relative">
            <CarouselContent className="ml-0">
              {slides.map((slide, index) => (
                <CarouselItem key={slide.src} className="pl-0">
                  <div className="relative aspect-3/2 overflow-hidden rounded-[2rem] border border-border/70 bg-muted shadow-2xl shadow-primary/10">
                    <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />

                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/0 to-black/0" />

                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-green shadow-sm backdrop-blur">{slide.label}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 z-10 size-9 border-0 bg-white/90 text-foreground shadow-md hover:bg-white" />
            <CarouselNext className="right-3 z-10 size-9 border-0 bg-white/90 text-foreground shadow-md hover:bg-white" />
          </Carousel>

          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((slide, index) => (
              <button key={slide.src} type="button" onClick={() => api?.scrollTo(index)} aria-label={`Show slide ${index + 1}: ${slide.label}`} aria-current={current === index} className={cn("h-2 rounded-full transition-all", current === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
