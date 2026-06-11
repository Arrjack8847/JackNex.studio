
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import HowIWork from "@/components/HowIWork";
import Stats from "@/components/Stats";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <HowIWork />
      <Stats />
      <About />
      <ContactCTA />
    </div>
  );
};

export default Index;

