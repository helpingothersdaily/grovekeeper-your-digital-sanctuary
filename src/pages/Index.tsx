import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TendingModes from "@/components/TendingModes";
import BranchReply from "@/components/BranchReply";
import GroveReport from "@/components/GroveReport";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <TendingModes />
      <BranchReply />
      <GroveReport />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
