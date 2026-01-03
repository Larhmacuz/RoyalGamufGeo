import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home as HomeIcon, Building2, Sun, Droplets } from "lucide-react";

const featuredServices = [
  {
    icon: Droplets,
    title: "Borehole Drilling",
    description: "Professional borehole construction and water solutions for homes and businesses",
    link: "/services/hydrology"
  },
  {
    icon: Building2,
    title: "Building Construction",
    description: "Complete building design, civil works, and structural engineering services",
    link: "/services/building-civil"
  },
  {
    icon: Sun,
    title: "Solar Installation",
    description: "Reliable solar power systems for uninterrupted electricity supply",
    link: "/services/solar-installation"
  },
  {
    icon: HomeIcon,
    title: "Property Sales",
    description: "Buy and sell verified land and properties across Nigeria",
    link: "/properties"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsSection />
      
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
              Popular Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most requested services across Nigeria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <Card key={index} className="hover-elevate text-center" data-testid={`card-featured-${index}`}>
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <Link href={service.link}>
                    <Button variant="outline" size="sm" data-testid={`button-featured-${index}`}>
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </div>
  );
}
