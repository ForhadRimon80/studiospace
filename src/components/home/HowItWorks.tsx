import Link from "next/link";
import { ArrowRight, CalendarClock, Search, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Browse verified studios, compare hourly rates and save the spaces that fit your production.",
    icon: Search,
    iconClass:
      "bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300",
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Check live availability and choose the exact hourly blocks your team needs.",
    icon: CalendarClock,
    iconClass:
      "bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300",
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Confirm your reservation securely. Double-booking protection keeps your slot safe.",
    icon: Zap,
    iconClass:
      "bg-light-green text-primary-green dark:bg-primary-green/15 dark:text-accent-lime",
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Arrive at the space, plug into the equipment and bring your creative vision to life.",
    icon: Sparkles,
    iconClass:
      "bg-violet-100 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-green dark:text-accent-lime">
          Frictionless booking
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          How Booking Works
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">
          Four simple steps from pre-production concept to rolling camera in a
          space that fits your crew.
        </p>
      </div>

      <div className="relative mt-10">
        <div
          aria-hidden="true"
          className="absolute left-[12%] right-[12%] top-16 hidden border-t border-dashed border-border lg:block"
        />

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, title, description, icon: Icon, iconClass }) => (
            <article
              key={number}
              className="rounded-2xl border border-border bg-bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`grid size-11 place-items-center rounded-xl ${iconClass}`}
                >
                  <Icon className="size-5" />
                </span>
                <span className="text-2xl font-extrabold text-border">
                  {number}
                </span>
              </div>

              <h3 className="mt-5 text-base font-bold text-text-primary">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          nativeButton={false}
          render={<Link href="/studios" />}
          className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Start Exploring Workspaces
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
