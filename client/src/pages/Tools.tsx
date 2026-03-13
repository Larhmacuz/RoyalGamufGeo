import { Calculator, MapPin } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tools() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Real Estate Intelligence Tools
            </h1>
            <p className="text-lg text-slate-300">
              Smart tools to help you analyze land and estimate construction costs before building.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Calculator className="h-6 w-6" />
                </div>
                <CardTitle className="pt-4">Construction Cost Estimator</CardTitle>
                <CardDescription>
                  Estimate the cost of building residential structures based on size, finish, and location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/estimate" data-testid="link-tools-hub-estimate">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Use Estimator</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="pt-4">Land Intelligence Check</CardTitle>
                <CardDescription>
                  Analyze land suitability before buying or starting a construction project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/land-check" data-testid="link-tools-hub-land-check">
                  <Button variant="outline" className="w-full">Analyze Land</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
