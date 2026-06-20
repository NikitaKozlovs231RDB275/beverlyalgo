import { HeroSection } from "../components/ui/hero-section-1";
import { FeaturesGrid } from "../components/ui/features-grid";
import Logos from "../components/sections/logos/default";
import QuickStartGuide from "../components/sections/quick-start/default";
import Pricing from "../components/sections/pricing/default";
import FAQ from "../components/sections/faq/default";
import { SocialConnect } from "../components/ui/connect-with-us";
import { Footer } from "../components/ui/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      {/* Hero — grid + gradient visible */}
      <HeroSection />

      <div id="features">
        <FeaturesGrid />
      </div>

      <div id="results">
        <Logos />
      </div>

      <div>
        <QuickStartGuide />
      </div>

      <div id="pricing" className="line-b">
        <Pricing />
      </div>

      <div id="faq">
        <FAQ />
      </div>

      <div id="contact">
        <SocialConnect />
      </div>

      <Footer />
    </main>
  );
}
