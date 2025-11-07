import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Geologists_conducting_field_work_49ae6f2c.png";

export default function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
          Professional Geological Services & Expertise
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          Comprehensive geological solutions for mineral exploration, environmental assessment, and engineering projects across Nigeria
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/services" data-testid="link-services-cta">
            <Button size="lg" className="text-lg px-8">
              Our Services
            </Button>
          </Link>
          <Link href="/contact" data-testid="link-contact-cta">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Get Consultation
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-white/80 text-sm" data-testid="text-trust-indicator">
          Trusted geological expertise delivering precise results across Nigeria
        </p>
      </div>
    </div>
  );
}
