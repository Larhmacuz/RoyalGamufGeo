import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, MessageCircle, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-heading">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8 text-white/90" data-testid="text-cta-description">
          Contact us today for land verification, property sales, or geological services. We're here to help you make safe investments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Link href="/contact" data-testid="link-cta-contact">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-white/90"
            >
              Contact Us
            </Button>
          </Link>
          <Link href="/properties" data-testid="link-cta-properties">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Properties
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/90">
          <a href="tel:+2347048266273" className="flex items-center gap-2 hover:text-white" data-testid="link-cta-phone">
            <Phone className="w-5 h-5" />
            <span>+234 704 826 6273</span>
          </a>
          <a 
            href="https://wa.me/2347048266273" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white"
            data-testid="link-cta-whatsapp"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </a>
          <a href="mailto:royalgamufnig.ltd@gmail.com" className="flex items-center gap-2 hover:text-white" data-testid="link-cta-email">
            <Mail className="w-5 h-5" />
            <span>royalgamufnig.ltd@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
