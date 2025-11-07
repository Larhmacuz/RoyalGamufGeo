import { Check } from "lucide-react";

const highlights = [
  "Experienced geologists with proven track record",
  "Modern equipment and advanced methodologies",
  "Comprehensive project documentation and reporting",
  "Timely delivery and professional communication"
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-why-choose-heading">
              Why Choose Royal Gamuf Nig LTD
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-why-choose-description">
              With years of expertise in geological services across Nigeria, we deliver accurate, reliable results that drive successful project outcomes.
            </p>
            <ul className="space-y-4">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`text-highlight-${index}`}>
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-base">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Geological equipment image placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
