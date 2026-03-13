import { Building2, Calculator, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    title: "Verify Land Before Buying",
    description:
      "Check land legitimacy and development suitability before committing to a purchase.",
    icon: ShieldCheck,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Estimate Construction Costs",
    description:
      "Use our smart construction cost estimator to plan your building budget before starting your project.",
    icon: Calculator,
    accent: "bg-blue-100 text-blue-700",
  },
  {
    title: "Manage and Develop Property",
    description:
      "From surveying to estate planning and development advisory, we guide your property projects from start to finish.",
    icon: Building2,
    accent: "bg-amber-100 text-amber-700",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl" data-testid="text-how-it-works-title">
            How Royal Gamuf Helps You Build Smarter
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600" data-testid="text-how-it-works-subtitle">
            From land verification to construction planning, we help property investors and homeowners make confident decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Card
              key={item.title}
              className="group border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              data-testid={`card-how-it-works-${index}`}
            >
              <CardContent className="p-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.accent}`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
