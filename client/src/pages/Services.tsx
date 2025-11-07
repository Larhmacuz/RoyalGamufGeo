import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Compass, Gem, Leaf, Droplets, HardHat, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Geological Works & Field Investigation",
    description: "Comprehensive on-site geological surveys and detailed terrain analysis for accurate project planning and assessment.",
    slug: "field-investigation"
  },
  {
    icon: Gem,
    title: "Mineral Exploration",
    description: "Advanced mineral prospecting and resource evaluation using modern exploration techniques and methodologies.",
    slug: "mineral-exploration"
  },
  {
    icon: Leaf,
    title: "Environmental Geology",
    description: "Environmental impact assessments, contamination studies, and sustainable land use planning solutions.",
    slug: "environmental-geology"
  },
  {
    icon: Droplets,
    title: "Hydrology",
    description: "Groundwater assessment, water resource management, and hydrogeological investigation services.",
    slug: "hydrology"
  },
  {
    icon: HardHat,
    title: "Engineering Geology",
    description: "Geotechnical investigations, foundation studies, and site characterization for construction projects.",
    slug: "engineering-geology"
  },
  {
    icon: MessageSquare,
    title: "Geology Consultation",
    description: "Expert geological advice, project feasibility studies, and technical consultation for diverse projects.",
    slug: "consultation"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-services-page-title">
            Our Services
          </h1>
          <p className="text-lg text-primary-foreground/90" data-testid="text-services-page-subtitle">
            Comprehensive geological solutions for every project requirement
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
