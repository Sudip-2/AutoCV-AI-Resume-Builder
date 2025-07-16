import FeatureSec from "@/components/custom/Features";
import HeroSec from "@/components/custom/HeroSec";
import HowItWorks from "@/components/custom/HowItWorks";
import MainFooter from "@/components/custom/MainFooter";

export default function LandingPage() {
  return (
    <main>
      <HeroSec />
      <FeatureSec />
      <HowItWorks />
      <MainFooter />
    </main>
  );
}
