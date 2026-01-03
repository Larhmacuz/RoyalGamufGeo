import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, MessageCircle, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-green-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-heading">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg mb-8 text-white/90" data-testid="text-cta-description">
          Contact us today for professional consultation. We serve clients across all 36 states of Nigeria.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/request-quote" data-testid="link-cta-quote">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-white/90"
            >
              Get Free Quote
            </Button>
          </Link>
          <Link href="/contact" data-testid="link-cta-contact">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-center text-white/90">
          <a href="tel:+2348112370243" className="flex items-center gap-2 hover:text-white" data-testid="link-cta-phone">
            <Phone className="w-5 h-5" />
            <span>+234 811 237 0243</span>
          </a>
          <a 
            href="https://wa.me/2348112370243" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white"
            data-testid="link-cta-whatsapp"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </a>
          <a href="mailto:okeowoabdsalam@gmail.com" className="flex items-center gap-2 hover:text-white" data-testid="link-cta-email">
            <Mail className="w-5 h-5" />
            <span>okeowoabdsalam@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
