import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, CheckCircle2, Mail, MapPin, ShieldCheck, Star } from "lucide-react";

import StudioBookingCard from "@/components/studios/StudioBookingCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IStudio } from "@/lib/types/studiospace";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Demo rating based on the studio id
function getRating(id: string) {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (4 + (sum % 10) / 10).toFixed(1);
}

// Get valid image URL
const getImageUrl = (image?: string | null) => {
  const imageUrl = image?.trim();

  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);

    const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1];

    if (fileId && url.hostname === "drive.google.com") {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`;
    }

    return url.protocol === "http:" || url.protocol === "https:" ? imageUrl : null;
  } catch {
    return null;
  }
};

const StudioDetailsPage = async ({ params }: { params: Promise<{ Id: string[] }> }) => {
  const { Id } = await params;
  const studioId = Id.at(-1);

  if (!studioId) {
    notFound();
  }

  // Get the current session and user information (server side)
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const imageUrl = getImageUrl(user?.image);

  const res = await fetch(`http://localhost:5000/studios/${studioId}`, { cache: "no-store" });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio");
  }

  const studio: IStudio = await res.json();

  const rating = getRating(studio._id);
  const image = studio.imageUrl || "/images/common.png";

  return (
    <main className="bg-bg-page">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Category & location */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-accent-lime px-3 py-1 text-xs font-semibold text-dark-green dark:text-black">{studio.category}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5 text-text-secondary">
            <MapPin className="size-4 shrink-0" />
            {studio.location}
          </span>
        </div>

        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">{studio.title}</h1>

        {/* Gallery */}
        <div className="mt-6">
          <div className="relative aspect-16/10 overflow-hidden rounded-3xl border border-border bg-muted shadow-sm sm:aspect-16/7">
            <Image src={image} alt={studio.title} fill priority unoptimized sizes="(max-width: 1024px) 100vw, 1100px" className="object-cover" />
            <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">Photo 1 of 1</span>
          </div>

          <div className="mt-3 flex gap-3">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 border-primary bg-muted">
              <Image src={image} alt={`${studio.title} thumbnail`} fill unoptimized sizes="96px" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-5">
            {/* Key facts */}
            <Card className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardContent className="p-5">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Hourly Rate</dt>
                    <dd className="mt-1 text-lg font-extrabold text-primary-green dark:text-accent-lime">${studio.hourlyRate}/hr</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Security Deposit</dt>
                    <dd className="mt-1 text-lg font-extrabold text-text-primary">${studio.securityDeposit}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Max Capacity</dt>
                    <dd className="mt-1 text-lg font-extrabold text-text-primary">{studio.maxCapacity} people</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Client Rating</dt>
                    <dd className="mt-1 flex flex-wrap items-center gap-1.5">
                      <Star className="size-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-extrabold text-text-primary">{rating}</span>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Overview */}
            <Card className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-lg font-bold tracking-tight text-text-primary sm:text-xl">Workspace Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-3">
                <p className="text-sm leading-7 text-text-secondary">{studio.overview}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-lg font-bold tracking-tight text-text-primary sm:text-xl">Equipment &amp; Amenities</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                {studio.amenities.length > 0 ? (
                  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {studio.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-green dark:text-accent-lime" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-text-secondary">No amenities listed for this studio yet.</p>
                )}
              </CardContent>
            </Card>

            {/* Host */}
            <Card className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-10/88 border border-neutral-200 bg-neutral-100 dark:border-border dark:bg-bg-page">
                      {imageUrl ? <AvatarImage src={imageUrl} alt={user?.name || "User"} referrerPolicy="no-referrer" /> : null}

                      <AvatarFallback>{user?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-bold text-text-primary">Hosted by {studio.hostName}</p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-light-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-green dark:bg-primary-green/15 dark:text-accent-lime">
                          <BadgeCheck className="size-3.5" />
                          Verified Host
                        </span>
                      </div>

                      <p className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
                        <Mail className="size-3.5 shrink-0" />
                        Contact:
                        <a href={`mailto:${studio.hostEmail}`} className="font-semibold text-primary-green hover:underline dark:text-accent-lime">
                          {studio.hostEmail}
                        </a>
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-light-green/70 px-4 py-2 text-xs font-semibold text-primary-green dark:bg-bg-page dark:text-accent-lime">
                    <ShieldCheck className="size-4 shrink-0" />
                    Protected by StudioSpace Host Guarantee
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking */}
          <aside className="lg:sticky lg:top-24">
            <StudioBookingCard studio={studio} rating={rating} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default StudioDetailsPage;
