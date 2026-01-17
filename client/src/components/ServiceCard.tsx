import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
}

export default function ServiceCard({ icon: Icon, title, description, slug }: ServiceCardProps) {
  return (
    <Card className="hover-elevate h-full flex flex-col" data-testid={`card-service-${slug}`}>
      <CardHeader>
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-xl" data-testid={`text-service-title-${slug}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="flex-1 text-base" data-testid={`text-service-description-${slug}`}>
          {description}
        </CardDescription>
        <Link href={`/services/${slug}`} data-testid={`link-service-${slug}`}>
          <Button variant="ghost" className="mt-4 px-0 text-blue-600 dark:text-blue-400 hover:text-blue-700">
            Learn More →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
