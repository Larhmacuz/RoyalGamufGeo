import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/properties", label: "Properties" },
    { path: "/about", label: "About" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-green-600 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="tel:+2347048266273" className="flex items-center gap-2 hover:text-green-100" data-testid="link-topbar-phone">
            <Phone className="w-4 h-4" />
            <span>+234 704 826 6273</span>
          </a>
          <Link href="/request-quote">
            <span className="hidden sm:inline hover:text-green-100 cursor-pointer" data-testid="link-topbar-quote">
              Request Free Quote
            </span>
          </Link>
        </div>
      </div>
      
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md cursor-pointer">
                <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RG</span>
                </div>
                <span className="font-semibold text-lg">Royal Gamuf</span>
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
              <Link href="/request-quote" data-testid="link-get-quote">
                <Button size="sm" className="ml-2 bg-green-600 hover:bg-green-700">
                  Get Quote
                </Button>
              </Link>
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
              <Link href="/request-quote">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
