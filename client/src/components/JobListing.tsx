import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase } from "lucide-react";

interface JobListingProps {
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  onApply: () => void;
}

export default function JobListing({ title, location, type, department, description, onApply }: JobListingProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-job-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <CardTitle className="text-xl" data-testid="text-job-title">{title}</CardTitle>
        <CardDescription className="flex flex-wrap gap-4 mt-2">
          <span className="flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4" />
            {type}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Briefcase className="w-4 h-4" />
            {department}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4" data-testid="text-job-description">{description}</p>
        <Button onClick={onApply} data-testid="button-apply">
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
}
