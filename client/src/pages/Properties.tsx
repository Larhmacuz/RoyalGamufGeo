import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Maximize, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const properties = [
  {
    id: 1,
    title: "Commercial Land - Lagos",
    type: "For Sale",
    category: "Land",
    location: "Lekki, Lagos",
    size: "2,500 sqm",
    price: "₦150,000,000",
    description: "Prime commercial land in strategic Lekki location, suitable for commercial development or investment.",
    features: ["Fenced", "Accessible Road", "C of O Available"]
  },
  {
    id: 2,
    title: "Residential Plot - Abuja",
    type: "For Sale",
    category: "Land",
    location: "Gwarinpa, Abuja",
    size: "1,200 sqm",
    price: "₦85,000,000",
    description: "Well-positioned residential plot in serene Gwarinpa estate with all necessary documentation.",
    features: ["Tarred Road", "Electricity", "R of O"]
  },
  {
    id: 3,
    title: "Office Complex - Port Harcourt",
    type: "For Rent",
    category: "Commercial",
    location: "GRA, Port Harcourt",
    size: "500 sqm",
    price: "₦12,000,000/year",
    description: "Modern office complex with multiple units, ideal for corporate headquarters or business operations.",
    features: ["24/7 Power", "Parking", "Security"]
  },
  {
    id: 4,
    title: "Industrial Land - Ogun State",
    type: "For Sale",
    category: "Industrial",
    location: "Sagamu, Ogun",
    size: "10,000 sqm",
    price: "₦200,000,000",
    description: "Large industrial land suitable for manufacturing, warehousing, or logistics operations.",
    features: ["Near Expressway", "Flat Terrain", "Gazette"]
  },
  {
    id: 5,
    title: "Residential Estate Plot - Ibadan",
    type: "For Sale",
    category: "Land",
    location: "Bodija, Ibadan",
    size: "800 sqm",
    price: "₦25,000,000",
    description: "Affordable residential plot in well-developed Bodija area with growing property value.",
    features: ["Good Drainage", "Estate Security", "C of O"]
  },
  {
    id: 6,
    title: "Warehouse Space - Lagos",
    type: "For Rent",
    category: "Commercial",
    location: "Apapa, Lagos",
    size: "2,000 sqm",
    price: "₦35,000,000/year",
    description: "Spacious warehouse facility in prime Apapa industrial zone, close to port facilities.",
    features: ["Loading Bay", "High Ceiling", "Security"]
  }
];

export default function Properties() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-properties-page-title">
            Properties & Real Estate
          </h1>
          <p className="text-lg text-primary-foreground/90" data-testid="text-properties-page-subtitle">
            Buy, sell, or lease properties with trusted guidance from Royal Gamuf Nig LTD
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section className="bg-card rounded-lg p-8 border">
            <h2 className="text-2xl font-bold mb-4">Our Real Estate Services</h2>
            <p className="text-muted-foreground mb-6" data-testid="text-realestate-intro">
              Beyond our core geological and engineering expertise, Royal Gamuf Nig LTD offers comprehensive real estate services. We leverage our deep understanding of land, terrain, and construction to help clients make informed property investment decisions. Whether you're looking to buy, sell, or lease residential, commercial, or industrial properties, our team provides professional guidance throughout the process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">Land Sales</div>
                <p className="text-sm text-muted-foreground">Verified plots with proper documentation</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">Property Leasing</div>
                <p className="text-sm text-muted-foreground">Commercial and residential rentals</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">Investment Advisory</div>
                <p className="text-sm text-muted-foreground">Expert guidance on property investments</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Available Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="hover-elevate" data-testid={`card-property-${property.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <Badge variant={property.type === "For Sale" ? "default" : "secondary"}>
                        {property.type}
                      </Badge>
                      <Badge variant="outline">{property.category}</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2" data-testid="text-property-title">{property.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4" data-testid="text-property-description">
                      {property.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Maximize className="w-4 h-4 text-muted-foreground" />
                        {property.size}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-primary" data-testid="text-property-price">
                        {property.price}
                      </span>
                      <Link href="/contact">
                        <Button size="sm" data-testid={`button-inquire-${property.id}`}>
                          Inquire
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-lg p-8 border">
            <h2 className="text-2xl font-bold mb-4">Have a Property to Sell?</h2>
            <p className="text-muted-foreground mb-6" data-testid="text-sell-property">
              If you have land or property you wish to sell, partner with Royal Gamuf Nig LTD. We connect sellers with verified buyers and ensure smooth, transparent transactions. Our geological expertise allows us to properly assess land value and potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+2347048266273" className="flex items-center gap-2">
                <Button variant="outline" data-testid="button-call-property">
                  <Phone className="w-4 h-4 mr-2" />
                  +234 704 826 6273
                </Button>
              </a>
              <a href="mailto:royalgamufnig.ltd@gmail.com" className="flex items-center gap-2">
                <Button variant="outline" data-testid="button-email-property">
                  <Mail className="w-4 h-4 mr-2" />
                  royalgamufnig.ltd@gmail.com
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
