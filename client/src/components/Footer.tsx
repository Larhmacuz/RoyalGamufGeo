import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RG</span>
              </div>
              <span className="font-semibold text-lg">Royal Gamuf</span>
            </div>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-tagline">
              Professional geological services delivering expertise and reliability across Nigeria.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/field-investigation" data-testid="link-footer-field"><span className="text-muted-foreground hover:text-foreground">Field Investigation</span></Link></li>
              <li><Link href="/services/mineral-exploration" data-testid="link-footer-mineral"><span className="text-muted-foreground hover:text-foreground">Mineral Exploration</span></Link></li>
              <li><Link href="/services/environmental-geology" data-testid="link-footer-environmental"><span className="text-muted-foreground hover:text-foreground">Environmental Geology</span></Link></li>
              <li><Link href="/services/hydrology" data-testid="link-footer-hydrology"><span className="text-muted-foreground hover:text-foreground">Hydrology</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" data-testid="link-footer-about"><span className="text-muted-foreground hover:text-foreground">About Us</span></Link></li>
              <li><Link href="/services" data-testid="link-footer-services"><span className="text-muted-foreground hover:text-foreground">All Services</span></Link></li>
              <li><Link href="/careers" data-testid="link-footer-careers"><span className="text-muted-foreground hover:text-foreground">Careers</span></Link></li>
              <li><Link href="/request-quote" data-testid="link-footer-quote"><span className="text-muted-foreground hover:text-foreground">Request Quote</span></Link></li>
              <li><Link href="/contact" data-testid="link-footer-contact"><span className="text-muted-foreground hover:text-foreground">Contact</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <a href="mailto:okeowoabdsalam@gmail.com" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-email">
                  okeowoabdsalam@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <a href="tel:+2348112370243" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-phone">
                  +234 811 237 0243
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground" data-testid="text-footer-address">
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
