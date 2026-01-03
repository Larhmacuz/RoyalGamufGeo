import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Mountain, 
  FileCheck, 
  Building2, 
  Home, 
  Lightbulb 
} from "lucide-react";

const services = [
  {
    icon: Mountain,
    title: "Geological Survey & Site Investigation",
    description: "Professional geological assessments, soil testing, and site analysis for construction and development projects.",
    link: "/services/field-investigation"
  },
  {
    icon: FileCheck,
    title: "Land Verification & Documentation",
    description: "Thorough verification of land titles, survey plans, and legal documentation to ensure safe property transactions.",
    link: "/services/site-verification"
  },
  {
    icon: Building2,
    title: "Estate & Property Management",
    description: "Complete property management services including maintenance, tenant management, and property oversight.",
    link: "/services/estate-management"
  },
  {
    icon: Home,
    title: "Property Buying & Selling",
    description: "Buy and sell verified lands, houses, and commercial properties across Nigeria with full documentation.",
    link: "/properties"
  },
  {
    icon: Lightbulb,
    title: "Land & Real Estate Advisory",
    description: "Expert advice on land investments, property valuation, and real estate opportunities in Nigeria.",
    link: "/services/consultation"
  }
];

export default function HomeServices() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-services-title">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining geological expertise with professional estate management to serve you better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-home-service-${index}`}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <Link href={service.link}>
                  <Button variant="ghost" size="sm" className="px-0 text-green-600 dark:text-green-400">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services">
            <Button variant="outline" size="lg" data-testid="button-view-all-services">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
