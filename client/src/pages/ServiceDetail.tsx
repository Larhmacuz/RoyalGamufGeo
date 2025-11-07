import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Compass, Gem, Leaf, Droplets, HardHat, MessageSquare, Check } from "lucide-react";

const serviceDetails: Record<string, {
  title: string;
  icon: any;
  description: string;
  overview: string;
  deliverables: string[];
  process: { step: string; description: string }[];
}> = {
  "field-investigation": {
    title: "Geological Works & Field Investigation",
    icon: Compass,
    description: "Comprehensive on-site geological surveys and detailed terrain analysis",
    overview: "Our field investigation services provide thorough geological assessments through systematic site surveys, rock and soil sampling, structural mapping, and detailed terrain analysis. We employ modern surveying equipment and proven methodologies to deliver accurate, actionable geological data.",
    deliverables: [
      "Detailed geological maps and cross-sections",
      "Comprehensive field reports with findings",
      "Rock and soil sample analysis",
      "Structural and stratigraphic interpretations",
      "Digital data and GIS integration"
    ],
    process: [
      { step: "Site Reconnaissance", description: "Initial assessment and planning" },
      { step: "Field Survey", description: "Systematic geological mapping and sampling" },
      { step: "Laboratory Analysis", description: "Sample testing and characterization" },
      { step: "Reporting", description: "Comprehensive documentation and recommendations" }
    ]
  },
  "mineral-exploration": {
    title: "Mineral Exploration",
    icon: Gem,
    description: "Advanced mineral prospecting and resource evaluation",
    overview: "We provide comprehensive mineral exploration services using geophysical surveys, geochemical analysis, and remote sensing techniques to identify and evaluate mineral resources. Our expertise covers base metals, precious metals, and industrial minerals.",
    deliverables: [
      "Mineral resource assessment reports",
      "Geophysical and geochemical surveys",
      "Target area identification",
      "Resource estimation and modeling",
      "Exploration strategy development"
    ],
    process: [
      { step: "Prospect Evaluation", description: "Desktop study and data compilation" },
      { step: "Field Exploration", description: "Geophysical and geochemical surveys" },
      { step: "Resource Modeling", description: "Data analysis and interpretation" },
      { step: "Recommendations", description: "Feasibility assessment and next steps" }
    ]
  },
  "environmental-geology": {
    title: "Environmental Geology",
    icon: Leaf,
    description: "Environmental impact assessments and sustainable solutions",
    overview: "Our environmental geology services address contamination assessment, environmental impact studies, and sustainable land use planning. We help clients understand and mitigate geological hazards while ensuring compliance with environmental regulations.",
    deliverables: [
      "Environmental impact assessment reports",
      "Contamination site investigations",
      "Remediation strategy development",
      "Regulatory compliance documentation",
      "Environmental monitoring programs"
    ],
    process: [
      { step: "Baseline Assessment", description: "Environmental conditions evaluation" },
      { step: "Impact Analysis", description: "Risk assessment and modeling" },
      { step: "Mitigation Planning", description: "Strategy development" },
      { step: "Monitoring", description: "Ongoing environmental surveillance" }
    ]
  },
  "hydrology": {
    title: "Hydrology",
    icon: Droplets,
    description: "Groundwater assessment and water resource management",
    overview: "We provide comprehensive hydrogeological services including groundwater exploration, aquifer characterization, water quality assessment, and sustainable water resource management solutions for industrial, agricultural, and municipal applications.",
    deliverables: [
      "Hydrogeological investigation reports",
      "Aquifer testing and characterization",
      "Water quality analysis",
      "Groundwater modeling",
      "Well site selection and design"
    ],
    process: [
      { step: "Site Assessment", description: "Hydrogeological mapping" },
      { step: "Testing & Analysis", description: "Aquifer testing and water sampling" },
      { step: "Modeling", description: "Groundwater flow simulation" },
      { step: "Recommendations", description: "Water resource management plan" }
    ]
  },
  "engineering-geology": {
    title: "Engineering Geology",
    icon: HardHat,
    description: "Geotechnical investigations for construction projects",
    overview: "Our engineering geology services support construction projects through detailed site characterization, foundation investigations, slope stability analysis, and geotechnical design recommendations for safe and cost-effective development.",
    deliverables: [
      "Geotechnical investigation reports",
      "Foundation design recommendations",
      "Slope stability assessments",
      "Site characterization studies",
      "Construction material evaluation"
    ],
    process: [
      { step: "Site Investigation", description: "Subsurface exploration and sampling" },
      { step: "Laboratory Testing", description: "Soil and rock property analysis" },
      { step: "Analysis", description: "Geotechnical evaluation" },
      { step: "Design Support", description: "Engineering recommendations" }
    ]
  },
  "consultation": {
    title: "Geology Consultation",
    icon: MessageSquare,
    description: "Expert geological advice and technical consultation",
    overview: "We offer professional geological consultation services for project planning, feasibility studies, technical reviews, and expert witness testimony. Our consultants bring decades of experience across diverse geological disciplines.",
    deliverables: [
      "Technical feasibility studies",
      "Geological risk assessments",
      "Project planning support",
      "Expert technical reviews",
      "Professional recommendations"
    ],
    process: [
      { step: "Consultation", description: "Understanding project requirements" },
      { step: "Analysis", description: "Technical evaluation" },
      { step: "Strategy Development", description: "Recommendation formulation" },
      { step: "Implementation Support", description: "Ongoing technical guidance" }
    ]
  }
};

export default function ServiceDetail() {
  const [match, params] = useRoute("/services/:slug");
  const slug = params?.slug || "";
  const service = serviceDetails[slug];

  if (!match || !service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <Link href="/services">
              <Button>View All Services</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <Icon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-service-detail-title">
              {service.title}
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/90" data-testid="text-service-detail-subtitle">
            {service.description}
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-overview">
              {service.overview}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">What We Deliver</h2>
            <ul className="space-y-3">
              {service.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`text-deliverable-${index}`}>
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-base">{deliverable}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.process.map((step, index) => (
                <div key={index} className="border rounded-lg p-6" data-testid={`card-process-${index}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold">{step.step}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-lg p-8 border text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Contact us to discuss how we can help with your {service.title.toLowerCase()} needs
            </p>
            <Link href="/contact" data-testid="link-service-contact">
              <Button size="lg">Contact Us</Button>
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
