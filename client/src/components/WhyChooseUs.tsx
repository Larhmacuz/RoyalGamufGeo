import { Shield, Clock, Award, Headphones, CheckCircle, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Shield,
    title: "CAC Registered",
    description: "Fully registered with the Corporate Affairs Commission of Nigeria"
  },
  {
    icon: Award,
    title: "Certified Professionals",
    description: "Our team includes certified geologists and licensed engineers"
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We complete projects on schedule with no compromise on quality"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always available to answer your questions and provide updates"
  },
  {
    icon: FileCheck,
    title: "Proper Documentation",
    description: "All projects come with comprehensive reports and certificates"
  },
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description: "We stand behind our work with warranty and after-service support"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-why-title">
            Why Nigerians Trust Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-why-subtitle">
            Royal Gamuf Nig LTD has built a reputation for excellence, integrity, and reliable service delivery across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-reason-${index}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
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
