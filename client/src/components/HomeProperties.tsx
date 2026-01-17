import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { MapPin } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Residential Plot",
    location: "Lekki, Lagos",
    type: "Land",
    price: "₦25,000,000",
    size: "600 sqm",
    status: "Available"
  },
  {
    id: 2,
    title: "Commercial Land",
    location: "Abuja, FCT",
    type: "Land",
    price: "₦45,000,000",
    size: "1000 sqm",
    status: "Available"
  },
  {
    id: 3,
    title: "3 Bedroom Bungalow",
    location: "Ibadan, Oyo",
    type: "House",
    price: "₦18,000,000",
    size: "3 Bed, 2 Bath",
    status: "Available"
  },
  {
    id: 4,
    title: "Estate Land",
    location: "Port Harcourt, Rivers",
    type: "Land",
    price: "Contact for Price",
    size: "2 Plots",
    status: "Available"
  },
  {
    id: 5,
    title: "Office Complex",
    location: "Victoria Island, Lagos",
    type: "Commercial",
    price: "₦150,000,000",
    size: "800 sqm",
    status: "Available"
  },
  {
    id: 6,
    title: "Farmland",
    location: "Ogun State",
    type: "Land",
    price: "₦8,000,000",
    size: "5 Acres",
    status: "Available"
  }
];

export default function HomeProperties() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-properties-title">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verified lands and properties for sale across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="hover-elevate overflow-visible" data-testid={`card-property-${property.id}`}>
              <div className="h-40 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Property Image</span>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{property.type}</Badge>
                  <Badge className="bg-blue-600 text-white text-xs">{property.status}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{property.size}</p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{property.price}</span>
                  <Link href="/properties">
                    <Button size="sm" variant="outline" data-testid={`button-view-property-${property.id}`}>
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/properties">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-view-all-properties">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
