import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chief Adebayo Ogundimu",
    role: "Property Developer, Lagos",
    content: "Royal Gamuf verified my 5 plots in Abeokuta before purchase. Their geological survey revealed drainage issues that saved me millions in future construction costs. Highly professional team.",
    rating: 5
  },
  {
    name: "Mrs. Folake Adeyemi",
    role: "Business Owner, Ibadan",
    content: "I was about to buy land with ownership disputes. Royal Gamuf's thorough verification uncovered the problem before I made a costly mistake. They truly protect their clients.",
    rating: 5
  },
  {
    name: "Engr. Chukwuemeka Obi",
    role: "Civil Engineer, Enugu",
    content: "Their borehole drilling and soil testing services are top-notch. The detailed reports helped us design proper foundations for our commercial building project.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-testimonials-title">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by property buyers, developers, and businesses across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-testimonial-${index}`}>
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-blue-600/20 mb-4" />
                <p className="text-muted-foreground mb-4 italic" data-testid={`text-testimonial-content-${index}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-1 mb-3" data-testid={`rating-testimonial-${index}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold" data-testid={`text-testimonial-name-${index}`}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
