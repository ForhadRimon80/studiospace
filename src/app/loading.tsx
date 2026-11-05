import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-bg-page" aria-label="Loading StudioSpace">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-12 w-full max-w-xl rounded-xl" />
            <Skeleton className="h-5 w-full max-w-lg rounded-full" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-11 w-36 rounded-full" />
              <Skeleton className="h-11 w-32 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-56 w-full rounded-3xl" />
        </section>

        <section className="mt-12">
          <div className="mb-5 space-y-3">
            <Skeleton className="h-4 w-36 rounded-full" />
            <Skeleton className="h-8 w-64 rounded-xl" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl bg-bg-surface shadow-sm ring-1 ring-border/70">
                <Skeleton className="h-40 w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
