import { useMemo, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { MapPin, Mountain, ShieldCheck, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BuildingType = "duplex" | "apartment" | "commercial" | "bungalow";

interface LandReport {
  location: string;
  landSize: number;
  buildingType: BuildingType;
  budgetLow: number;
  budgetHigh: number;
}

const BUILDING_LABELS: Record<BuildingType, string> = {
  duplex: "Duplex",
  apartment: "Apartment",
  commercial: "Commercial Building",
  bungalow: "Residential Bungalow",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

function getBudgetSuggestion(landSize: number, buildingType: BuildingType) {
  if (buildingType === "duplex") {
    const estimatedSize = landSize >= 500 ? 320 : 260;
    const constructionCost = estimatedSize * 320000;
    const total = constructionCost + constructionCost * 0.07 + constructionCost * 0.1;
    return { budgetLow: total * 0.9, budgetHigh: total * 1.1 };
  }

  if (buildingType === "bungalow") {
    const estimatedSize = landSize >= 450 ? 180 : 140;
    const constructionCost = estimatedSize * 320000;
    const total = constructionCost + constructionCost * 0.07 + constructionCost * 0.1;
    return { budgetLow: total * 0.9, budgetHigh: total * 1.1 };
  }

  const coverage = buildingType === "apartment" ? 0.7 : 0.65;
  const floors = buildingType === "apartment" ? 2.5 : 2;
  const costPerSqm = buildingType === "apartment" ? 320000 : 450000;
  const estimatedSize = Math.max(180, landSize * coverage * floors);
  const constructionCost = estimatedSize * costPerSqm;
  const total = constructionCost + constructionCost * 0.07 + constructionCost * 0.1;

  return { budgetLow: total * 0.9, budgetHigh: total * 1.1 };
}

export default function LandCheck() {
  const [location, setLocation] = useState("");
  const [landSize, setLandSize] = useState("");
  const [buildingType, setBuildingType] = useState<BuildingType>("duplex");
  const [report, setReport] = useState<LandReport | null>(null);

  const parsedLandSize = useMemo(() => Number(landSize), [landSize]);

  const handleAnalyze = () => {
    if (!location.trim() || !parsedLandSize || parsedLandSize <= 0) {
      return;
    }

    const suggestion = getBudgetSuggestion(parsedLandSize, buildingType);

    setReport({
      location: location.trim(),
      landSize: parsedLandSize,
      buildingType,
      budgetLow: suggestion.budgetLow,
      budgetHigh: suggestion.budgetHigh,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white/85">
              <MapPin className="h-4 w-4" />
              Land Intelligence Check
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Land Intelligence Check</h1>
            <p className="text-lg text-slate-300">
              Analyze land suitability before buying or building.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-8">
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle>Site inputs</CardTitle>
              <CardDescription>
                Enter basic land information to generate a preliminary land intelligence snapshot.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="land-location">Location</Label>
                  <Input
                    id="land-location"
                    placeholder="e.g. Ajah, Lagos"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    data-testid="input-land-location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="land-size">Land Size (sqm)</Label>
                  <Input
                    id="land-size"
                    type="number"
                    min="1"
                    placeholder="e.g. 600"
                    value={landSize}
                    onChange={(event) => setLandSize(event.target.value)}
                    data-testid="input-land-size"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="building-type">Intended Building Type</Label>
                  <Select value={buildingType} onValueChange={(value: BuildingType) => setBuildingType(value)}>
                    <SelectTrigger id="building-type" data-testid="select-building-type">
                      <SelectValue placeholder="Select building type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="commercial">Commercial Building</SelectItem>
                      <SelectItem value="bungalow">Residential Bungalow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-4 text-sm text-slate-600">
                Phase 1 preview: this is an early front-end land screening tool and does not replace a professional
                site investigation.
              </div>

              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleAnalyze}
                data-testid="button-analyze-land"
              >
                Analyze Land
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-lg lg:sticky lg:top-24 lg:self-start">
            <CardHeader>
              <CardTitle>Land analysis</CardTitle>
              <CardDescription>
                {report
                  ? "Simulated Phase 1 report based on your site inputs."
                  : "Your land suitability report will appear here after analysis."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {report ? (
                <div className="space-y-5" data-testid="card-land-check-results">
                  <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900 p-6 text-white shadow-lg">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100/80">
                      Land Analysis Report
                    </p>
                    <p className="mt-3 text-sm text-emerald-100/85">
                      {report.location} • {report.landSize} sqm • {BUILDING_LABELS[report.buildingType]}
                    </p>
                    <p className="mt-4 text-3xl font-semibold leading-tight">
                      {formatCurrency(report.budgetLow)} - {formatCurrency(report.budgetHigh)}
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      Indicative construction budget aligned to the current estimator cost structure.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <InsightCard
                      icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
                      title="Soil Suitability"
                      value="Moderate"
                    />
                    <InsightCard
                      icon={<Waves className="h-4 w-4 text-blue-600" />}
                      title="Flood Risk"
                      value="Low Risk"
                    />
                    <InsightCard
                      icon={<Mountain className="h-4 w-4 text-amber-600" />}
                      title="Terrain"
                      value="Flat terrain suitable for residential construction"
                    />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">Development Recommendation</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Suitable for residential development such as duplex or apartment buildings.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link href="/estimate" data-testid="link-land-check-estimator">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Use Construction Cost Estimator
                      </Button>
                    </Link>
                    <Link href="/request-quote" data-testid="link-land-check-request-quote">
                      <Button variant="outline" className="w-full">
                        Request Professional Site Investigation
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                  Enter a site location, land size, and intended building type to generate a simple land intelligence
                  report.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InsightCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        {icon}
        {title}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{value}</p>
    </div>
  );
}
