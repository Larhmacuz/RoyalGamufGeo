import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/borehole-construction-company-in-ajah-lekki-vi-ikeja-lagos-1200x675_1762507342174.jpg";

export default function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
          Engineering, Surveying &<br />
          <span className="text-blue-400">Land Services You Can Trust</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
          We provide professional geological surveys, land verification, property buying & selling, and estate management services across Nigeria.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/properties" data-testid="link-properties-cta">
            <Button size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700">
              View Properties
            </Button>
          </Link>
          <Link href="/contact" data-testid="link-contact-cta">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
