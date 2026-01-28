import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Properties from "@/pages/Properties";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import RequestQuote from "@/pages/RequestQuote";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/not-found";
import WhatsAppButton from "@/components/WhatsAppButton";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/properties" component={Properties} />
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      <Route path="/request-quote" component={RequestQuote} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <WhatsAppButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
