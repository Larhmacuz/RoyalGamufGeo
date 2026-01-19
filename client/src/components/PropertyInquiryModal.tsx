import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Loader2, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Property {
  id: number;
  title: string;
  type: string;
  category: string;
  location: string;
  size: string;
  price: string;
  description: string;
  features: string[];
}

interface PropertyInquiryModalProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inquiryFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  message: z.string().min(5, "Message is required"),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export default function PropertyInquiryModal({ property, open, onOpenChange }: PropertyInquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "I'm interested in this property",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InquiryFormData) => {
      if (!property) throw new Error("No property selected");
      
      const payload = {
        ...data,
        email: data.email || null,
        propertyTitle: property.title,
        propertyLocation: property.location,
        propertyPrice: property.price,
        propertyType: property.category,
      };
      
      return apiRequest("POST", "/api/property-inquiries", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      form.reset({
        fullName: "",
        phone: "",
        email: "",
        message: "I'm interested in this property",
      });
    }, 200);
  };

  const onSubmit = (data: InquiryFormData) => {
    mutation.mutate(data);
  };

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]" data-testid="modal-property-inquiry">
        <DialogHeader>
          <DialogTitle data-testid="modal-title">
            {submitted ? "Inquiry Sent!" : "Property Inquiry"}
          </DialogTitle>
          <DialogDescription>
            {submitted 
              ? "Thank you for your interest. We'll contact you shortly."
              : "Fill in your details to inquire about this property."
            }
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">
              Our team will reach out to you within 24 hours.
            </p>
            <Button onClick={handleClose} data-testid="button-close-modal">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                <Badge variant="outline">{property.category}</Badge>
                <Badge>{property.type}</Badge>
              </div>
              <h3 className="font-semibold text-lg" data-testid="modal-property-title">{property.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span data-testid="modal-property-location">{property.location}</span>
              </div>
              <div className="text-primary font-bold" data-testid="modal-property-price">{property.price}</div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  {...form.register("fullName")}
                  data-testid="input-fullname"
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+234 xxx xxx xxxx"
                  {...form.register("phone")}
                  data-testid="input-phone"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...form.register("email")}
                  data-testid="input-email"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  {...form.register("message")}
                  data-testid="input-message"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                )}
              </div>

              {mutation.isError && (
                <p className="text-sm text-destructive">Failed to submit inquiry. Please try again.</p>
              )}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1" data-testid="button-cancel">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={mutation.isPending}
                  data-testid="button-submit-inquiry"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
