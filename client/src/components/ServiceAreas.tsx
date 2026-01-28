import { MapPin } from "lucide-react";

const serviceAreas = [
  { state: "Ogun State", cities: "Abeokuta, Ijebu-Ode, Sagamu, Ota" },
  { state: "Lagos State", cities: "Ikeja, Lekki, Ikorodu, Epe" },
  { state: "Oyo State", cities: "Ibadan, Ogbomoso, Oyo" },
  { state: "Osun State", cities: "Osogbo, Ile-Ife, Ilesa" },
  { state: "Ondo State", cities: "Akure, Ondo, Ore" },
  { state: "Ekiti State", cities: "Ado-Ekiti, Ikere, Ijero" },
];

export default function ServiceAreas() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-areas-title">
            Areas We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Providing geological and estate services across South-West Nigeria and beyond
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {serviceAreas.map((area, index) => (
            <div 
              key={index} 
              className="text-center p-4 rounded-lg border bg-background hover-elevate"
              data-testid={`card-area-${index}`}
            >
              <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-sm" data-testid={`text-area-state-${index}`}>{area.state}</p>
              <p className="text-xs text-muted-foreground mt-1" data-testid={`text-area-cities-${index}`}>{area.cities}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm" data-testid="text-areas-note">
          Don't see your area? Contact us — we travel to any location in Nigeria for your project.
        </p>
      </div>
    </section>
  );
}
