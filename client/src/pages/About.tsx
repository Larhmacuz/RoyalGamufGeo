import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const credentials = [
  "Licensed geological consultants",
  "Advanced surveying and analysis equipment",
  "Proven track record across diverse projects",
  "Commitment to safety and environmental standards"
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-about-page-title">
            About Royal Gamuf Nig LTD
          </h1>
          <p className="text-lg text-primary-foreground/90" data-testid="text-about-page-subtitle">
            Professional geological expertise you can trust
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Expertise</h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-company-story">
              Royal Gamuf Nig LTD is a professional geological and engineering services company dedicated to providing comprehensive solutions across Nigeria. Our team brings deep expertise in field investigation, mineral exploration, environmental assessment, hydrology, engineering geology, and professional consultation.
            </p>
            <p className="text-lg text-muted-foreground" data-testid="text-company-mission">
              In addition to our core geological expertise, Royal Gamuf Nig LTD has expanded into full-scale engineering and construction services. We specialize in building design, civil works, structural engineering, solar system installation, and complete project management — providing clients with end-to-end solutions that combine scientific precision with construction excellence, delivering dependable results from the ground beneath to the structures above.
            </p>
          </section>

          <section className="bg-card rounded-lg p-8 border">
            <h2 className="text-2xl font-bold mb-6">Our Credentials</h2>
            <ul className="space-y-4">
              {credentials.map((credential, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`text-credential-${index}`}>
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-base">{credential}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Our Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <h3 className="font-semibold text-lg mb-2" data-testid="text-value-quality">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Delivering precise, reliable geological data and analysis
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="font-semibold text-lg mb-2" data-testid="text-value-professionalism">Professionalism</h3>
                <p className="text-sm text-muted-foreground">
                  Maintaining highest standards of service and communication
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="font-semibold text-lg mb-2" data-testid="text-value-innovation">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Utilizing modern techniques and equipment
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
