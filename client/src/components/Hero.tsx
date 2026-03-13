import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/borehole-construction-company-in-ajah-lekki-vi-ikeja-lagos-1200x675_1762507342174.jpg";

export default function Hero() {
  return (
    <div className="relative flex min-h-[88vh] items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.2),transparent_28%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-950/78 to-slate-900/88" />
      <div className="absolute -left-20 top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_380px] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Trusted geology, engineering, and estate management support
          </div>

          <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl" data-testid="text-hero-title">
            Build, verify, and manage property with a team that understands both
            <span className="text-cyan-300"> engineering discipline and land value.</span>
          </h1>
          
          <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl" data-testid="text-hero-subtitle">
            Royal Gamuf delivers geological surveys, land verification, construction planning, property transactions,
            and estate management services across Nigeria with practical, project-ready guidance.
          </p>

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link href="/estimate" data-testid="link-estimator-cta">
              <Button size="lg" className="min-w-[220px] bg-blue-600 px-8 text-base hover:bg-blue-700">
                Try Cost Estimator
                <Calculator className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/properties" data-testid="link-properties-cta">
              <Button size="lg" variant="outline" className="min-w-[200px] border-white/25 bg-white/10 px-8 text-base text-white hover:bg-white/20">
                View Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" data-testid="link-contact-cta">
              <Button 
                size="lg" 
                variant="outline" 
                className="min-w-[190px] border-white/25 bg-transparent px-8 text-base text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white">10+</p>
              <p className="mt-1 text-sm text-slate-200">Service lines spanning land, engineering, and property advisory.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white">Nigeria</p>
              <p className="mt-1 text-sm text-slate-200">Support for residential, commercial, and investment decisions.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white">Fast</p>
              <p className="mt-1 text-sm text-slate-200">Early-stage budgeting and validation tools for better planning.</p>
            </div>
          </div>
        </div>

        <div className="flex items-end">
          <div className="w-full rounded-[28px] border border-white/12 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Project Intelligence</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Construction estimator</span>
                  <Calculator className="h-4 w-4 text-cyan-300" />
                </div>
                <p className="mt-3 text-2xl font-semibold">Budget clarity before site mobilization</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  Nationwide service coverage
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Geological investigation, title verification, property sales support, and estate management in one coordinated platform.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-lg font-semibold">Geo</p>
                  <p className="text-xs text-slate-300">Surveys</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-lg font-semibold">Build</p>
                  <p className="text-xs text-slate-300">Planning</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-lg font-semibold">Estate</p>
                  <p className="text-xs text-slate-300">Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
