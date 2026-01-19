import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertQuoteRequestSchema, type InsertQuoteRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quoteRequestFormSchema = insertQuoteRequestSchema.extend({
  companyName: insertQuoteRequestSchema.shape.companyName.refine(
    (val) => val.length >= 2,
    "Company name must be at least 2 characters"
  ),
  contactName: insertQuoteRequestSchema.shape.contactName.refine(
    (val) => val.length >= 2,
    "Contact name must be at least 2 characters"
  ),
  phone: insertQuoteRequestSchema.shape.phone.refine(
    (val) => val.length >= 10,
    "Phone number must be at least 10 digits"
  ),
  projectLocation: insertQuoteRequestSchema.shape.projectLocation.refine(
    (val) => val.length >= 3,
    "Please provide project location"
  ),
  projectScope: insertQuoteRequestSchema.shape.projectScope.refine(
    (val) => val.length >= 50,
    "Please provide more details about your project (at least 50 characters)"
  ),
});

const services = [
  "Geological Works & Field Investigation",
  "Mineral Exploration",
  "Environmental Geology",
  "Hydrology",
  "Engineering Geology",
  "Geology Consultation",
  "Building Design",
  "Civil Works",
  "Structural Engineering",
  "Solar System Installation",
  "Project Management",
  "Multiple Services"
];

const timelines = [
  "Urgent (Within 1 month)",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "12+ months",
  "Flexible"
];

export default function QuoteRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(quoteRequestFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      serviceType: "",
      projectLocation: "",
      projectScope: "",
      timeline: "",
      budget: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      const response = await apiRequest("POST", "/api/quote-requests", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      console.error("Quote request submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem submitting your quote request. Please try again.",
      });
    },
  });

  const onSubmit = (data: InsertQuoteRequest) => {
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-lg p-6 border">
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2" data-testid="text-success-title">Quote Request Submitted!</h3>
          <p className="text-muted-foreground mb-6" data-testid="text-success-message">
            Our team will review your request and get back to you within 24-48 hours with a detailed quotation.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" data-testid="button-submit-another">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 border">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company Ltd" {...field} data-testid="input-company" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} data-testid="input-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@company.com" {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+234 704 826 6273" {...field} data-testid="input-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-service">
                      <SelectValue placeholder="Select the service you need" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State, Nigeria" {...field} data-testid="input-location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectScope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Scope & Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please describe your project in detail: objectives, site conditions, specific requirements, expected deliverables, etc."
                    className="min-h-40"
                    {...field}
                    data-testid="input-scope"
                  />
                </FormControl>
                <FormDescription>
                  The more details you provide, the more accurate our quote will be
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Timeline</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-timeline">
                        <SelectValue placeholder="When do you need this completed?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timelines.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Budget (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ₦5,000,000 - ₦10,000,000" {...field} data-testid="input-budget" />
                  </FormControl>
                  <FormDescription>
                    Helps us tailor our proposal to your needs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg" 
            disabled={submitMutation.isPending}
            data-testid="button-submit"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Quote"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
