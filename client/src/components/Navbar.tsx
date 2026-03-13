import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/ChatGPT_Image_Jan_16,_2026,_05_38_07_PM_1768638281460.png";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/properties", label: "Properties" },
    { path: "/tools", label: "Tools" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 py-2 text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
          <Phone className="h-4 w-4" />
          <span className="text-xs font-medium tracking-[0.22em] text-white/90 uppercase">
            Royal Gamuf Nig LTD
          </span>
        </div>
      </div>
      
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link href="/" data-testid="link-home">
              <div className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-slate-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                  <img src={logoImage} alt="Royal Gamuf Nig Ltd" className="h-9 w-auto" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xl font-semibold tracking-tight text-slate-900">Royal Gamuf</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Engineering and Property Advisory</p>
                </div>
              </div>
            </Link>

            <div className="hidden items-center md:flex">
              <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/90 p-1.5 shadow-sm">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                    <button
                      type="button"
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-white hover:text-slate-900",
                        location === item.path && "bg-white text-slate-950 shadow-sm",
                      )}
                    >
                      {item.label}
                    </button>
                  </Link>
                ))}
              </div>
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
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="space-y-2 px-4 py-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start rounded-xl px-4 py-3 text-sm ${location === item.path ? "bg-slate-100" : ""}`}
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
