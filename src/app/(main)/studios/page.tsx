import StudiosExplorer from "@/components/studios/StudiosExplorer";
import type { IStudio } from "@/lib/types/studiospace";

const ExploreStudioPage = async ({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) => {
  const { category } = await searchParams;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);
  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }
  const studios: IStudio[] = await res.json();

  return (
    <main className="overflow-hidden bg-bg-page">
      <StudiosExplorer studios={studios} initialCategory={Array.isArray(category) ? category[0] : category} />
    </main>
  );
};

export default ExploreStudioPage;
