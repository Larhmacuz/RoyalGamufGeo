import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-heading">
          Ready to Discuss Your Geological Project?
        </h2>
        <p className="text-lg mb-8 text-primary-foreground/90" data-testid="text-cta-description">
          Contact us today for professional consultation and expert geological services
        </p>
        <Link href="/contact" data-testid="link-cta-contact">
          <Button 
            size="lg" 
            variant="outline"
            className="bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90"
          >
            Get in Touch
          </Button>
        </Link>
      </div>
    </section>
  );
}
