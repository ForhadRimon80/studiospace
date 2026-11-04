import Link from "next/link";
import { BadgeCheck, Headphones, HeartHandshake, ShieldCheck, UserCheck, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const assurances = [
  {
    title: "$1,000,000 Host Liability Protection",
    description: "Comprehensive property and stage damage coverage backed by creative-industry insurance partners.",
    icon: ShieldCheck,
  },
  {
    title: "Identity & Professional Verification",
    description: "Every host and creator completes ID and portfolio checks before a booking is confirmed.",
    icon: UserCheck,
  },
  {
    title: "Production Equipment Safeguard",
    description: "High-value lenses, microphones and lighting grids are protected with itemized check-in and check-out.",
    icon: Wrench,
  },
  {
    title: "24/7 Dedicated Production Concierge",
    description: "On-call help for technical access, power hookups, acoustic issues and emergency reschedules.",
    icon: Headphones,
  },
];

const trustPoints = [
  {
    title: "Host Guarantee",
    description: "Liability and gear protection",
    icon: ShieldCheck,
  },
  {
    title: "Verified Workspaces",
    description: "Inspected acoustics, power and gear",
    icon: BadgeCheck,
  },
  {
    title: "Creator First",
    description: "Zero hidden fees, transparent booking",
    icon: HeartHandshake,
  },
];

export default async function HostGuarantee() {
  // Get the current session and user information (server side)
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <section id="about-us" className="border-t border-border/60 bg-bg-surface dark:bg-bg-page">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-green dark:text-accent-lime">Trust, safety &amp; peace of mind</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">Built on Uncompromising Protection for Both Hosts &amp; Creators</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">Creative production is unpredictable. StudioSpace provides enterprise-grade safety coverage, verified host guarantees and around-the-clock support so you can focus entirely on the craft.</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button nativeButton={false} render={user ? <Link href="/add-new-studio" /> : <Link href="/signup" />} className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Become a Verified Host
              </Button>
              <Button nativeButton={false} variant="outline" render={<Link href="/studios" />} className="h-11 rounded-full border-border bg-bg-surface px-6 text-sm font-semibold text-text-primary hover:bg-muted">
                Browse Studio Spaces
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {assurances.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-border bg-bg-page p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-bg-surface">
                <span className="grid size-10 place-items-center rounded-xl bg-light-green text-primary-green dark:bg-primary-green/15 dark:text-accent-lime">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold leading-6 text-text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-light-green/60 p-5 sm:grid-cols-3 dark:bg-bg-surface">
          {trustPoints.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-bg-surface text-primary-green shadow-sm dark:bg-bg-page dark:text-accent-lime">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-text-primary">{title}</p>
                <p className="text-xs text-text-secondary">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
