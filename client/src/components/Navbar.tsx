import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/ChatGPT_Image_Jan_16,_2026,_05_38_07_PM_1768638281460.png";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/properties", label: "Properties" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-blue-600 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <a href="tel:+2347048266273" className="flex items-center gap-2 hover:text-blue-100" data-testid="link-topbar-phone">
            <Phone className="w-4 h-4" />
            <span>+234 704 826 6273</span>
          </a>
        </div>
      </div>
      
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md cursor-pointer">
                <img src={logoImage} alt="Royal Gamuf Nig Ltd" className="h-10 w-auto" />
                <span className="font-semibold text-lg hidden sm:inline">Royal Gamuf</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={location === item.path ? "bg-accent" : ""}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-menu-toggle"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${location === item.path ? "bg-accent" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
