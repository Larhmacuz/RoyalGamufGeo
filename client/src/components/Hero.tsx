import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@assets/borehole-construction-company-in-ajah-lekki-vi-ikeja-lagos-1200x675_1762507342174.jpg";

export default function Hero() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold mb-6" data-testid="badge-cac">
          CAC Registered Company
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
          Nigeria's Trusted Partner in<br />
          <span className="text-green-400">Geological & Engineering Services</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          From borehole drilling to building construction, mineral exploration to solar installation — we deliver quality projects across Nigeria with expertise you can trust.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/services" data-testid="link-services-cta">
            <Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700">
              View Our Services
            </Button>
          </Link>
          <Link href="/request-quote" data-testid="link-quote-cta">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Get Free Quote
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="tel:+2348112370243" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md" data-testid="link-hero-phone">
            <Phone className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">+234 811 237 0243</span>
          </a>
          <a 
            href="https://wa.me/2348112370243" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            data-testid="link-hero-whatsapp"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
