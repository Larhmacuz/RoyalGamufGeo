import { Link } from "wouter";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiX, SiInstagram } from "react-icons/si";
import logoImage from "@assets/ChatGPT_Image_Jan_16,_2026,_05_38_07_PM_1768638281460.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImage} alt="Royal Gamuf Nig Ltd" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-footer-tagline">
              Professional geological services and estate management you can trust. CAC registered company serving clients across Nigeria.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/royalgamufnig" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-x">
                <SiX className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/royalgamuf/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/field-investigation" data-testid="link-footer-geological"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Geological Survey</span></Link></li>
              <li><Link href="/services/site-verification" data-testid="link-footer-verification"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Land Verification</span></Link></li>
              <li><Link href="/services/estate-management" data-testid="link-footer-estate"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Estate Management</span></Link></li>
              <li><Link href="/properties" data-testid="link-footer-properties"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Property Sales</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" data-testid="link-footer-about"><span className="text-muted-foreground hover:text-foreground cursor-pointer">About Us</span></Link></li>
              <li><Link href="/services" data-testid="link-footer-services"><span className="text-muted-foreground hover:text-foreground cursor-pointer">All Services</span></Link></li>
              <li><Link href="/careers" data-testid="link-footer-careers"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Careers</span></Link></li>
              <li><Link href="/request-quote" data-testid="link-footer-quote"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Request Quote</span></Link></li>
              <li><Link href="/contact" data-testid="link-footer-contact"><span className="text-muted-foreground hover:text-foreground cursor-pointer">Contact</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-blue-600" />
                <a href="tel:+2347048266273" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-phone">
                  +234 704 826 6273
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                <a 
                  href="https://wa.me/2347048266273" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground" 
                  data-testid="link-footer-whatsapp"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-blue-600" />
                <a href="mailto:royalgamufnig.ltd@gmail.com" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-email">
                  royalgamufnig.ltd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                <span className="text-muted-foreground" data-testid="text-footer-address">
                  Plot 42, Geological Survey Road<br />
                  Independence Layout<br />
                  Enugu, Enugu State<br />
                  Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-copyright">&copy; {currentYear} Royal Gamuf Nig LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
