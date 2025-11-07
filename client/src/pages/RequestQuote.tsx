import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequestForm from "@/components/QuoteRequestForm";

export default function RequestQuote() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-quote-page-title">
            Request a Quote
          </h1>
          <p className="text-lg text-primary-foreground/90" data-testid="text-quote-page-subtitle">
            Tell us about your project and we'll provide a detailed quotation
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <p className="text-lg text-muted-foreground" data-testid="text-quote-intro">
              Whether you need geological services, engineering solutions, or complete project management, we're here to help. Fill out the form below with your project details, and our team will prepare a comprehensive quotation tailored to your specific needs.
            </p>
          </div>

          <QuoteRequestForm />

          <div className="bg-card rounded-lg p-6 border">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li data-testid="text-process-1">We review your project details within 24-48 hours</li>
              <li data-testid="text-process-2">Our team may contact you for additional information if needed</li>
              <li data-testid="text-process-3">You receive a detailed quotation with project scope, timeline, and pricing</li>
              <li data-testid="text-process-4">We schedule a consultation to discuss the proposal and answer your questions</li>
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
