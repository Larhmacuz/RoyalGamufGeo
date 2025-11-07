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
              Royal Gamuf Nig LTD is a professional geological services company dedicated to providing comprehensive geological solutions across Nigeria. Our team of experienced geologists brings deep expertise in field investigation, mineral exploration, environmental assessment, hydrology, engineering geology, and professional consultation.
            </p>
            <p className="text-lg text-muted-foreground" data-testid="text-company-mission">
              We combine modern methodologies with proven field techniques to deliver accurate, reliable results that drive successful project outcomes. Whether you're planning a construction project, exploring mineral resources, or need environmental assessment, we provide the geological expertise you need.
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
