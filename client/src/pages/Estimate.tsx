import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Calculator, ArrowRight, Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";

type HouseType = "bungalow" | "duplex";
type Finish = "basic" | "standard" | "luxury";
type Location = "lagos" | "abuja" | "other";

interface EstimateResponse {
  estimatedSize: number;
  costPerSqm: number;
  constructionCost: number;
  professionalFees: number;
  contingency: number;
  totalLow: number;
  totalHigh: number;
}

const bedroomOptions: Record<HouseType, string[]> = {
  bungalow: ["3", "4"],
  duplex: ["4", "5"],
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

const formatLabel = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const explanationItems = [
  "Average cost per square meter",
  "Professional fee percentage",
  "Contingency percentage",
  "Market averages used",
];

export default function Estimate() {
  const [houseType, setHouseType] = useState<HouseType>("bungalow");
  const [bedrooms, setBedrooms] = useState("3");
  const [finish, setFinish] = useState<Finish>("standard");
  const [location, setLocation] = useState<Location>("lagos");
  const [shareCopied, setShareCopied] = useState(false);
  const hydratedFromUrl = useRef(false);

  useEffect(() => {
    const options = bedroomOptions[houseType];
    if (!options.includes(bedrooms)) {
      setBedrooms(options[0]);
    }
  }, [bedrooms, houseType]);

  const estimateMutation = useMutation({
    mutationFn: async (payload: {
      bedrooms: number;
      houseType: HouseType;
      finish: Finish;
      location: Location;
    }) => {
      const response = await apiRequest("POST", "/api/estimate", payload);
      return response.json() as Promise<EstimateResponse>;
    },
  });

  const buildSharePath = (values: {
    houseType: HouseType;
    bedrooms: string;
    finish: Finish;
    location: Location;
  }) =>
    `/estimate?${new URLSearchParams({
      type: values.houseType,
      bedrooms: values.bedrooms,
      finish: values.finish,
      location: values.location,
    }).toString()}`;

  const submitEstimate = (values: {
    houseType: HouseType;
    bedrooms: string;
    finish: Finish;
    location: Location;
  }) => {
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", buildSharePath(values));
    }

    estimateMutation.mutate({
      bedrooms: Number(values.bedrooms),
      houseType: values.houseType,
      finish: values.finish,
      location: values.location,
    });
  };

  useEffect(() => {
    if (hydratedFromUrl.current || typeof window === "undefined") {
      return;
    }

    hydratedFromUrl.current = true;

    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const queryBedrooms = params.get("bedrooms");
    const queryFinish = params.get("finish");
    const queryLocation = params.get("location");

    const isHouseType = (value: string | null): value is HouseType =>
      value === "bungalow" || value === "duplex";
    const isFinish = (value: string | null): value is Finish =>
      value === "basic" || value === "standard" || value === "luxury";
    const isLocation = (value: string | null): value is Location =>
      value === "lagos" || value === "abuja" || value === "other";

    if (!isHouseType(type) || !isFinish(queryFinish) || !isLocation(queryLocation) || !queryBedrooms) {
      return;
    }

    if (!bedroomOptions[type].includes(queryBedrooms)) {
      return;
    }

    setHouseType(type);
    setBedrooms(queryBedrooms);
    setFinish(queryFinish);
    setLocation(queryLocation);

    submitEstimate({
      houseType: type,
      bedrooms: queryBedrooms,
      finish: queryFinish,
      location: queryLocation,
    });
  }, [estimateMutation]);

  useEffect(() => {
    if (!shareCopied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShareCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [shareCopied]);

  const result = estimateMutation.data;
  const requestQuoteHref = result
    ? `/request-quote?${new URLSearchParams({
        source: "estimator",
        bedrooms,
        houseType,
        finish,
        location,
        estimateLow: Math.round(result.totalLow).toString(),
        estimateHigh: Math.round(result.totalHigh).toString(),
      }).toString()}`
    : "";
  const shareEstimateUrl =
    typeof window === "undefined"
      ? buildSharePath({ houseType, bedrooms, finish, location })
      : `${window.location.origin}${buildSharePath({ houseType, bedrooms, finish, location })}`;

  const downloadEstimatePdf = () => {
    if (!result) {
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - 40;
    let y = 20;

    const addTextBlock = (text: string, fontSize = 11) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, 20, y);
      y += lines.length * 6;
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Royal Gamuf Nig LTD", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Geology • Engineering • Estate Management", 20, y);
    y += 10;

    doc.setDrawColor(200, 208, 218);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Royal Gamuf Construction Cost Estimate", 20, y);
    y += 14;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Project Inputs", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    addTextBlock(`Bedrooms: ${bedrooms}`);
    addTextBlock(`House Type: ${formatLabel(houseType)}`);
    addTextBlock(`Finish Type: ${formatLabel(finish)}`);
    addTextBlock(`Location: ${formatLabel(location)}`);
    y += 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Cost Breakdown", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    addTextBlock(`Estimated Building Size: ${result.estimatedSize} sqm`);
    addTextBlock(`Cost per sqm: ${formatCurrency(result.costPerSqm)}`);
    addTextBlock(`Construction Cost: ${formatCurrency(result.constructionCost)}`);
    addTextBlock(`Professional Fees: ${formatCurrency(result.professionalFees)}`);
    addTextBlock(`Contingency: ${formatCurrency(result.contingency)}`);
    addTextBlock(`Estimated Total Range: ${formatCurrency(result.totalLow)} - ${formatCurrency(result.totalHigh)}`);
    y += 6;

    doc.setFont("helvetica", "bold");
    addTextBlock("Prepared by Royal Gamuf Nig LTD");
    y += 4;

    doc.setFont("helvetica", "normal");
    addTextBlock("Footer: This document is an indicative budget guide prepared for pre-project planning.");
    y += 2;

    doc.setFont("helvetica", "italic");
    addTextBlock(
      "Disclaimer: This estimate is based on average construction costs in Nigeria. Actual project cost may vary depending on soil conditions, structural design, material selection, site logistics, and final design decisions.",
      10,
    );

    doc.save("royal-gamuf-estimate.pdf");
  };

  const costBars = result
    ? [
        { label: "Construction Cost", value: result.constructionCost, tone: "bg-slate-900" },
        { label: "Professional Fees", value: result.professionalFees, tone: "bg-blue-600" },
        { label: "Contingency", value: result.contingency, tone: "bg-amber-500" },
      ]
    : [];
  const maxBarValue = result ? Math.max(...costBars.map((item) => item.value)) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white/85">
              <Calculator className="h-4 w-4" />
              Construction Cost Estimator
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="text-estimate-title">
              Estimate construction costs for your next residential project.
            </h1>
            <p className="text-lg text-slate-300" data-testid="text-estimate-subtitle">
              Compare building size assumptions, finish level, and location adjustments to get a practical budget range before you start.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle>Project inputs</CardTitle>
              <CardDescription>
                Choose the home type, finish level, and target location to generate an estimate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitEstimate({
                    houseType,
                    bedrooms,
                    finish,
                    location,
                  });
                }}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="houseType">House Type</Label>
                    <Select value={houseType} onValueChange={(value: HouseType) => setHouseType(value)}>
                      <SelectTrigger id="houseType" data-testid="select-house-type">
                        <SelectValue placeholder="Select house type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bungalow">Bungalow</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger id="bedrooms" data-testid="select-bedrooms">
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {bedroomOptions[houseType].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option} Bedroom{option === "1" ? "" : "s"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finish">Finish Type</Label>
                    <Select value={finish} onValueChange={(value: Finish) => setFinish(value)}>
                      <SelectTrigger id="finish" data-testid="select-finish">
                        <SelectValue placeholder="Select finish" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={location} onValueChange={(value: Location) => setLocation(value)}>
                      <SelectTrigger id="location" data-testid="select-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-100/70 p-4 text-sm text-slate-600">
                  Supported assumptions: 3 or 4 bedroom bungalow, 4 or 5 bedroom duplex.
                </div>

                {estimateMutation.isError && (
                  <p className="text-sm text-destructive" data-testid="text-estimate-error">
                    Failed to calculate estimate. Check your selections and try again.
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={estimateMutation.isPending}
                  data-testid="button-calculate-estimate"
                >
                  {estimateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Calculate Estimate"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="border-slate-200 shadow-lg lg:sticky lg:top-24 lg:self-start">
              <CardHeader>
                <CardTitle>Estimate summary</CardTitle>
                <CardDescription>
                  {result
                    ? "Indicative construction range based on your selected inputs."
                    : "Your calculated estimate will appear here after submission."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-5" data-testid="card-estimate-results">
                    <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-lg">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/80">
                        Result Summary
                      </p>
                      <p className="mt-3 text-sm text-blue-100/85">Estimated Project Budget</p>
                      <p className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
                        {formatCurrency(result.totalLow)} - {formatCurrency(result.totalHigh)}
                      </p>
                      <p className="mt-4 max-w-md text-sm leading-6 text-slate-200">
                        Based on estimated building size, finish type, and market construction averages.
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Project Summary
                        </p>
                      </div>
                      <div className="grid gap-3 p-5 sm:grid-cols-2">
                        <ResultRow label="Bedrooms" value={`${bedrooms}`} />
                        <ResultRow label="House Type" value={formatLabel(houseType)} />
                        <ResultRow label="Finish Type" value={formatLabel(finish)} />
                        <ResultRow label="Location" value={formatLabel(location)} />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Cost Breakdown
                        </p>
                      </div>
                      <div className="space-y-3 p-5">
                        <ResultRow label="Estimated building size" value={`${result.estimatedSize} sqm`} />
                        <ResultRow label="Cost per sqm" value={formatCurrency(result.costPerSqm)} />
                        <ResultRow label="Construction cost" value={formatCurrency(result.constructionCost)} />
                        <ResultRow label="Professional fees" value={formatCurrency(result.professionalFees)} />
                        <ResultRow label="Contingency" value={formatCurrency(result.contingency)} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-slate-900">Cost Breakdown Visualization</p>
                        <p className="text-xs text-slate-500">Relative distribution of the major cost components.</p>
                      </div>
                      <div className="space-y-4">
                        {costBars.map((item) => (
                          <div key={item.label} className="grid gap-2 sm:grid-cols-[150px_110px_minmax(0,1fr)] sm:items-center">
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            <span className="text-sm font-semibold text-slate-900">{formatCurrency(item.value)}</span>
                            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className={`h-full rounded-full ${item.tone}`}
                                style={{
                                  width: `${Math.max(8, (item.value / maxBarValue) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-semibold text-slate-900">Estimated Construction Timeline</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">8 - 12 months</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Timeline varies depending on project complexity and site conditions.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                    Select your project inputs and calculate to view the estimated size, costs, and final range.
                  </div>
                )}
              </CardContent>
            </Card>

            {result && (
              <>
                <Link href={requestQuoteHref} data-testid="link-request-detailed-estimate">
                  <Button className="w-full bg-blue-600 py-6 text-base hover:bg-blue-700">
                    Request Detailed Professional Estimate
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="how-estimate-works" className="border-b-0">
                        <AccordionTrigger className="px-5 py-4 text-left text-base font-semibold text-slate-900 hover:no-underline">
                          How this estimate was calculated
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5 text-slate-600">
                          <p className="mb-4 text-sm leading-6">
                            This estimate is based on benchmark residential build rates used for early-stage
                            planning in Nigeria. The calculator combines the following assumptions:
                          </p>
                          <ul className="space-y-2 text-sm">
                            {explanationItems.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {result && (
          <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-full py-6 text-base sm:w-auto sm:min-w-[260px]"
                onClick={downloadEstimatePdf}
                data-testid="button-download-estimate-pdf"
              >
                Download Estimate PDF
                <Download className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full py-6 text-base sm:w-auto sm:min-w-[220px]"
                onClick={async () => {
                  await navigator.clipboard.writeText(shareEstimateUrl);
                  setShareCopied(true);
                }}
                data-testid="button-copy-share-link"
              >
                Copy Share Link
              </Button>
            </div>
            {shareCopied && (
              <p className="mt-3 text-sm text-green-600" data-testid="text-share-link-copied">
                Link copied to clipboard
              </p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-right text-sm font-semibold text-slate-950">{value}</span>
    </div>
  );
}
