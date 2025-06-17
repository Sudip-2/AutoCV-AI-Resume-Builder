import FeatureSec from "@/components/custom/FeatureSec";
import HeroSec from "@/components/custom/HeroSec";

export default function LandingPage() {
  return (
    <div className="px-3">
      <main className="container mx-auto">
        {/* Hero Section */}
        <HeroSec />
        {/* Features Section */}
        <FeatureSec />
      </main>
    </div>
  );
}
