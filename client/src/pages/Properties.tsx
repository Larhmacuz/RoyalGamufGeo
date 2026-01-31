import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyInquiryModal from "@/components/PropertyInquiryModal";
import PropertyGalleryModal from "@/components/PropertyGalleryModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Maximize, Phone, Mail, ImageIcon, Loader2 } from "lucide-react";
import type { Property } from "@shared/schema";

import commercialLand1 from "@assets/stock_images/empty_land_plot_comm_1470f94f.jpg";
import commercialLand2 from "@assets/stock_images/empty_land_plot_comm_14dc261f.jpg";
import residentialLand1 from "@assets/stock_images/residential_land_plo_68c4c986.jpg";
import residentialLand2 from "@assets/stock_images/residential_land_plo_fa8a42ce.jpg";
import officeBuilding1 from "@assets/stock_images/modern_office_buildi_72d92934.jpg";
import officeBuilding2 from "@assets/stock_images/modern_office_buildi_86ce5b4f.jpg";
import warehouse1 from "@assets/stock_images/industrial_warehouse_523b4cd7.jpg";
import warehouse2 from "@assets/stock_images/industrial_warehouse_daaf486a.jpg";

const stockImages: Record<string, string> = {
  commercialLand1,
  commercialLand2,
  residentialLand1,
  residentialLand2,
  officeBuilding1,
  officeBuilding2,
  warehouse1,
  warehouse2,
};

const fallbackProperties = [
  {
    id: 1,
    title: "Commercial Land - Lagos",
    type: "For Sale",
    category: "Land",
    location: "Lekki, Lagos",
    size: "2,500 sqm",
    price: "₦150,000,000",
    description: "Prime commercial land in strategic Lekki location, suitable for commercial development or investment.",
    features: ["Fenced", "Accessible Road", "C of O Available"],
    images: [commercialLand1, commercialLand2],
    status: "available" as const,
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
    features: ["Tarred Road", "Electricity", "R of O"],
    images: [residentialLand1, residentialLand2],
    status: "available" as const,
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
    features: ["24/7 Power", "Parking", "Security"],
    images: [officeBuilding1, officeBuilding2],
    status: "available" as const,
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
    features: ["Near Expressway", "Flat Terrain", "Gazette"],
    images: [warehouse1, commercialLand1],
    status: "available" as const,
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
    features: ["Good Drainage", "Estate Security", "C of O"],
    images: [residentialLand2, residentialLand1],
    status: "available" as const,
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
    features: ["Loading Bay", "High Ceiling", "Security"],
    images: [warehouse2, warehouse1],
    status: "available" as const,
  }
];

interface DisplayProperty {
  id: number;
  title: string;
  type: string;
  category: string;
  location: string;
  size: string;
  price: string;
  description: string;
  features: string[];
  images: string[];
  status: "available" | "sold" | "under_offer";
}

function getPropertyImages(property: Property): string[] {
  if (property.images && property.images.length > 0) {
    return property.images.map(img => {
      if (img.startsWith('http') || img.startsWith('/')) {
        return img;
      }
      return stockImages[img] || img;
    });
  }
  return [commercialLand1];
}

function transformProperty(property: Property): DisplayProperty {
  return {
    id: property.id,
    title: property.title,
    type: property.type,
    category: property.category,
    location: property.location,
    size: property.size,
    price: property.price,
    description: property.description,
    features: property.features || [],
    images: getPropertyImages(property),
    status: property.status,
  };
}

export default function Properties() {
  const [selectedProperty, setSelectedProperty] = useState<DisplayProperty | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryProperty, setGalleryProperty] = useState<DisplayProperty | null>(null);

  const { data: dbProperties, isLoading, isError } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const properties: DisplayProperty[] = dbProperties && dbProperties.length > 0
    ? dbProperties.filter(p => p.status === "available").map(transformProperty)
    : fallbackProperties;

  const handleInquire = (property: DisplayProperty) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const handleOpenGallery = (property: DisplayProperty) => {
    setGalleryProperty(property);
    setGalleryOpen(true);
  };

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
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="hover-elevate overflow-hidden" data-testid={`card-property-${property.id}`}>
                    <div 
                      className="relative aspect-video bg-muted cursor-pointer group"
                      onClick={() => handleOpenGallery(property)}
                      data-testid={`img-property-${property.id}`}
                    >
                      {property.images && property.images.length > 0 ? (
                        <img 
                          src={property.images[0]} 
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      {property.images && property.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                          +{property.images.length - 1} more
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
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
                        <Button 
                          size="sm" 
                          onClick={() => handleInquire(property)}
                          data-testid={`button-inquire-${property.id}`}
                        >
                          Inquire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {!isLoading && properties.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No properties available at this time. Please check back later.
              </div>
            )}
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

      <PropertyInquiryModal
        property={selectedProperty ? {
          id: selectedProperty.id,
          title: selectedProperty.title,
          type: selectedProperty.type,
          category: selectedProperty.category,
          location: selectedProperty.location,
          size: selectedProperty.size,
          price: selectedProperty.price,
          description: selectedProperty.description,
          features: selectedProperty.features,
          images: selectedProperty.images,
        } : null}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      {galleryProperty && (
        <PropertyGalleryModal
          images={galleryProperty.images || []}
          title={galleryProperty.title}
          open={galleryOpen}
          onOpenChange={setGalleryOpen}
        />
      )}
    </div>
  );
}
