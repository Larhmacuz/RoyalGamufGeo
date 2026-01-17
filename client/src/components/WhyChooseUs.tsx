import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  FileCheck, 
  Mountain, 
  Eye, 
  Users, 
  Award 
} from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "No Land Disputes",
    description: "We verify all land titles and ownership history to protect you from disputes"
  },
  {
    icon: FileCheck,
    title: "Proper Documentation",
    description: "All properties come with complete and verified legal documents"
  },
  {
    icon: Mountain,
    title: "Professional Geological Assessment",
    description: "Expert soil testing and site analysis before any transaction"
  },
  {
    icon: Eye,
    title: "Transparent Process",
    description: "Clear communication and no hidden fees throughout every transaction"
  },
  {
    icon: Users,
    title: "Trusted by Nigerians",
    description: "Years of successful projects and satisfied clients across the country"
  },
  {
    icon: Award,
    title: "CAC Registered",
    description: "Fully registered and compliant with Nigerian corporate regulations"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-why-title">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We prioritize your safety and satisfaction in every transaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-reason-${index}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
