import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is land verification and why do I need it?",
    answer: "Land verification is a process where we confirm the legal ownership, survey authenticity, and history of a piece of land before you buy. This protects you from purchasing land with disputes, fake documents, or government acquisition issues. It's essential for any property transaction in Nigeria."
  },
  {
    question: "How long does a geological survey take?",
    answer: "A standard geological survey typically takes 3-5 working days, depending on the size of the land and the type of investigation required. Comprehensive surveys with soil testing and borehole drilling may take 1-2 weeks. We provide a timeline estimate before starting any project."
  },
  {
    question: "What documents do I need to provide for land verification?",
    answer: "You'll need to provide copies of the Survey Plan, Certificate of Occupancy (C of O) or Governor's Consent (if available), Deed of Assignment, and any receipts of previous transactions. If you're buying, the seller should provide these documents for verification."
  },
  {
    question: "Do you drill boreholes for water supply?",
    answer: "Yes, we provide professional borehole drilling services for both residential and commercial properties. We conduct a hydrogeological survey first to determine the best drilling location and expected water yield before starting the drilling process."
  },
  {
    question: "What areas in Nigeria do you cover?",
    answer: "We're based in Abeokuta, Ogun State, but we serve clients across South-West Nigeria including Lagos, Oyo, Osun, Ondo, and Ekiti States. For projects outside these areas, contact us to discuss arrangements — we can travel anywhere in Nigeria."
  },
  {
    question: "How much does a land verification cost?",
    answer: "Our land verification services start from ₦50,000 depending on the location and complexity. Geological surveys and soil testing have different pricing based on the scope of work. Contact us for a free quote specific to your project."
  },
  {
    question: "Can you help me find property to buy?",
    answer: "Yes, we have verified properties for sale across Ogun State and other locations. All properties listed with us have undergone our verification process, so you can buy with confidence. Visit our Properties page to see available listings."
  },
  {
    question: "What happens if you find problems during verification?",
    answer: "If we discover issues like ownership disputes, survey discrepancies, or government acquisition, we provide a detailed report explaining the problems. This allows you to make an informed decision — whether to negotiate, request the seller to resolve the issues, or walk away from the transaction."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-primary-foreground/90" data-testid="text-faq-subtitle">
            Common questions about our geological and estate services
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-6 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2" data-testid="text-faq-help-heading">Still have questions?</h3>
            <p className="text-muted-foreground mb-4" data-testid="text-faq-help-description">
              We're here to help. Reach out to us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+2347048266273" 
                className="text-blue-600"
                data-testid="link-faq-phone"
              >
                +234 704 826 6273
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a 
                href="mailto:royalgamufnig.ltd@gmail.com" 
                className="text-blue-600"
                data-testid="link-faq-email"
              >
                royalgamufnig.ltd@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
