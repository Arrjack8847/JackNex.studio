import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Services />
      <Stats />
      <About />
      <ContactCTA />
    </div>
  );
};

export default Index;