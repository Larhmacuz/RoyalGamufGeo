import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import StartProject from "@/components/StartProject";
import HomeServices from "@/components/HomeServices";
import HomeProperties from "@/components/HomeProperties";
import HomeAbout from "@/components/HomeAbout";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <StartProject />
      <HomeServices />
      <HomeProperties />
      <HomeAbout />
      <WhyChooseUs />
      <Testimonials />
      <ServiceAreas />
      <CTASection />
      <Footer />
    </div>
  );
}
