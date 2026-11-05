import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye, MapPin, Plus, Store, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IStudio } from "@/lib/types/studiospace";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EditMyStudioDialog from "@/components/MyStudioListingModify/EditMyStudioDialog";
import DeleteMyStudioDialog from "@/components/MyStudioListingModify/DeleteMyStudioDialog";

const MyStudioListingsPage = async () => {
  // Get the current session and user information (server side)
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  // Fetch studios
  const res = await fetch(`http://localhost:5000/my-studio-listings/${user?.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios: IStudio[] = await res.json();

  // Statistics
  const stats = [
    { label: "Total Listings", value: studios.length, icon: Store },
    { label: "Total Views", value: "—", icon: Eye },
    { label: "Total Bookings", value: "—", icon: CalendarDays },
    {
      label: "Total Capacity",
      value: studios.reduce((total, studio) => total + Number(studio.maxCapacity || 0), 0),
      icon: Users,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="relative mx-auto max-w-380">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#132330] dark:text-foreground sm:text-4xl">
              My Studio <span className="text-[#087a43] dark:text-[#b8f36b]">Listings</span>
            </h1>

            <p className="mt-1 text-sm text-[#52655e] dark:text-muted-foreground">Manage your studio listings here.</p>
          </div>

          <Link href="/add-new-studio" className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#087a43] px-5 text-sm font-medium text-white transition-colors hover:bg-[#064e32]">
            <Plus className="size-5" />
            Add New Studio
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="border-0 bg-[#e6f8e8] shadow-none dark:bg-bg-surface">
              <CardContent className="flex items-center gap-3 p-4">
                <Icon className="size-7 shrink-0 text-[#087a43] dark:text-[#b8f36b]" />

                <div>
                  <p className="text-xl font-extrabold text-[#132330] dark:text-foreground">{value}</p>

                  <p className="text-[11px] font-medium text-[#31443d] dark:text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Studio Listings */}
        {studios.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => (
              <Card key={studio._id} className="cursor-pointer overflow-hidden border-[#e1ebe6] bg-white p-0 shadow-sm transition-shadow hover:shadow-md dark:border-border dark:bg-bg-surface">
                {/* Image */}
                <div className="relative h-70">
                  <Image src={studio.imageUrl} alt={studio.title} loading="eager" unoptimized fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>

                {/* Studio Information */}

                <CardContent className="p-3.5">
                  {/* Title + Category */}
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm font-bold text-[#132330] dark:text-foreground">{studio.title}</h2>

                    <span className="shrink-0 rounded-full bg-[#d9f9df] px-3 py-1 text-[11px] font-semibold text-[#087a43] dark:bg-[#173d2c] dark:text-[#b8f36b]">{studio.category}</span>
                  </div>

                  {/* Location + Capacity */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#52655e] dark:text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {studio.location}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3.5" />
                      {studio.maxCapacity} People
                    </span>
                  </div>

                  {/* Pricing + Actions */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <p className="inline-flex items-center gap-1 rounded-full bg-[#d9f9df] px-3 py-2 text-xs font-semibold text-[#087a43] dark:bg-[#173d2c] dark:text-[#b8f36b]">
                        Hourly Rate: ${studio.hourlyRate}
                        <span className="font-medium">/ hr</span>
                      </p>

                      <p className="inline-flex items-center rounded-full bg-[#d9f9df] px-3 py-2 text-xs font-semibold text-[#087a43] dark:bg-[#173d2c] dark:text-[#b8f36b]">Deposit: ${studio.securityDeposit}</p>
                    </div>

                    <div className="flex w-full items-center justify-between gap-2">
                      <Link
                        href={`/studios/${studio._id}`}
                        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#087a43]/25 bg-[#f0fbf2] px-3 text-xs font-semibold text-[#087a43] transition-colors hover:bg-[#d9f9df] dark:border-[#b8f36b]/30 dark:bg-[#173d2c] dark:text-[#b8f36b] dark:hover:bg-[#20543a]"
                      >
                        Details
                        <ArrowRight className="size-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <EditMyStudioDialog studio={studio} />
                        <DeleteMyStudioDialog studio={studio} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed dark:border-border dark:bg-bg-surface">
            <CardContent className="p-8 text-center text-sm text-muted-foreground">No studio listings found.</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyStudioListingsPage;
