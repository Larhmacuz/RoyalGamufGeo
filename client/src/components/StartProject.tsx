import { Calculator, ClipboardCheck, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const actions = [
  {
    title: "Estimate Construction Cost",
    description:
      "Use our construction cost estimator to plan your building budget before starting your project.",
    buttonLabel: "Try Cost Estimator",
    href: "/estimate",
    icon: Calculator,
    accent: "bg-blue-100 text-blue-700",
  },
  {
    title: "Check Land Suitability",
    description:
      "Analyze land suitability and development potential before buying or building.",
    buttonLabel: "Analyze Land",
    href: "/land-check",
    icon: MapPin,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Request Professional Consultation",
    description:
      "Speak with our team for professional guidance on land verification, surveying, and development planning.",
    buttonLabel: "Contact Us",
    href: "/request-quote",
    icon: ClipboardCheck,
    accent: "bg-amber-100 text-amber-700",
  },
];

export default function StartProject() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl" data-testid="text-start-project-title">
            Start Your Property Project With Confidence
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600" data-testid="text-start-project-subtitle">
            Use our smart tools to analyze land, estimate construction costs, and plan your development before investing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {actions.map((action, index) => (
            <Card
              key={action.title}
              className="border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              data-testid={`card-start-project-${index}`}
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.accent}`}>
                  <action.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950">{action.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{action.description}</p>
                <Link href={action.href} data-testid={`link-start-project-${index}`}>
                  <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                    {action.buttonLabel}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
