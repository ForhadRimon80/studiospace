import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-bg-page px-4 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-border bg-bg-surface p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-light-green text-primary-green dark:bg-primary-green/15 dark:text-accent-lime">
          <Camera className="size-10" aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-primary-green dark:text-accent-lime">404 — Studio not found</p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">This creative space is off the map</h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-secondary">
          The page you are looking for may have moved, expired, or never existed.
        </p>

        <Button nativeButton={false} render={<Link href="/" />} className="mt-7 h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <ArrowLeft className="size-4" />
          Return to Home
        </Button>
      </section>
    </main>
  );
}
