import CategorySlider from "@/components/landing/CategorySlider";
import Banner from "@/components/landing/Banner";
import TrendingProducts from "@/components/landing/TrendingProducts";
import RecommendedList from "@/components/landing/RecommendedList";
import DailyBanner from "@/components/landing/DailyBanner";

export default function LandingPage() {
  return (
    
      <div className="w-full mx-auto px-[7%]">
        <Banner />
        <CategorySlider />
        <TrendingProducts />
        <RecommendedList />
        <DailyBanner />

      </div>
  
  );
}
