import { Award, Users, MapPin, Briefcase } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "200+", label: "Happy Clients" },
  { icon: MapPin, value: "36", label: "States Covered" },
  { icon: Award, value: "15+", label: "Years Experience" },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white" data-testid={`stat-${index}`}>
              <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm md:text-base opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
