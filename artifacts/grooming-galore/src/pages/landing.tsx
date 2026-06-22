import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsRow } from "@/components/sections/StatsRow";
import { Services } from "@/components/sections/Services";
import { Offers } from "@/components/sections/Offers";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Academy } from "@/components/sections/Academy";
import { Testimonials } from "@/components/sections/Testimonials";
import { Locations } from "@/components/sections/Locations";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsRow />
        <Services />
        <Offers />
        <About />
        <Gallery />
        <Academy />
        <Testimonials />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}
