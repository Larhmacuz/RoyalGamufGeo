import ServiceCard from "./ServiceCard";
import { Compass, Gem, Leaf, Droplets, HardHat, MessageSquare, Building2, Hammer, Sun } from "lucide-react";

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
    icon: Building2,
    title: "Building Design & Civil Works",
    description: "Architectural design, civil engineering, and construction services for residential and commercial projects.",
    slug: "building-civil"
  },
  {
    icon: Hammer,
    title: "Structural Engineering",
    description: "Structural design, analysis, and engineering solutions ensuring safe, durable construction outcomes.",
    slug: "structural-engineering"
  },
  {
    icon: Sun,
    title: "Solar System Installation",
    description: "Professional solar energy system design, installation, and maintenance for sustainable power solutions.",
    slug: "solar-installation"
  },
  {
    icon: MessageSquare,
    title: "Project Management & Consultation",
    description: "Complete project oversight, technical consultation, and expert guidance from planning to completion.",
    slug: "consultation"
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-services-heading">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-subheading">
            Comprehensive geological solutions tailored to your project needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
