import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import logoImage from "@assets/ChatGPT_Image_Jan_16,_2026,_05_38_07_PM_1768638281460.png";

const highlights = [
  "Led by a professional Geologist with years of experience",
  "Proper geological assessment before any land transaction",
  "Full documentation and legal support for all properties",
  "Trusted by clients across Nigeria"
];

export default function HomeAbout() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4" data-testid="text-about-title">
              About Royal Gamuf Nig LTD
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed" data-testid="text-about-description">
              Royal Gamuf Nig LTD is a Geologist-led company that combines professional geological expertise with estate and property management services. We understand that land is one of the most important investments you can make in Nigeria.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              That's why we provide thorough geological assessments, proper land verification, and complete documentation to ensure every property transaction is safe and transparent. Whether you're buying land, selling property, or need geological services for your construction project, we're here to help.
            </p>
            
            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`text-about-highlight-${index}`}>
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/about">
              <Button variant="outline" data-testid="button-learn-more-about">
                Learn More About Us
              </Button>
            </Link>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <div className="text-center">
              <div className="mx-auto mb-4">
                <img src={logoImage} alt="Royal Gamuf Nig Ltd" className="h-24 w-auto mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CAC Registered Company</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Fully registered with the Corporate Affairs Commission of Nigeria
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-background rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Done</div>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">36</div>
                  <div className="text-sm text-muted-foreground">States Covered</div>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">200+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
