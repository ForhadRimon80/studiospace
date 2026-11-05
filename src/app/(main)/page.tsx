import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSlider from "@/components/home/HeroSlider";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowItWorks from "@/components/home/HowItWorks";

const Home = async () => {

  const res = await fetch("http://localhost:5000/studios");
  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }
  const studios = await res.json();

  //Latest 6 studios
  const latestStudios = studios.slice(0, 6);

  return (
    <main className="overflow-hidden bg-bg-page">
      <HeroSlider studios={studios} />
      <FeaturedStudios studios={latestStudios} />
      <CategoryGrid categories={studios} />
      <HowItWorks />
      <HostGuarantee />
    </main>
  );
};

export default Home;
