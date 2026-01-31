import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  MessageSquare, 
  FileText, 
  Star,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  totalInquiries: number;
  contactInquiries: number;
  quoteRequests: number;
  propertyInquiries: number;
  totalTestimonials: number;
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome to your admin panel. Here's an overview of your business.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-muted rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card data-testid="card-stat-properties">
                <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Properties
                  </CardTitle>
                  <Home className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-total-properties">
                    {stats?.totalProperties || 0}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {stats?.availableProperties || 0} available
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-stat-inquiries">
                <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Inquiries
                  </CardTitle>
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-total-inquiries">
                    {stats?.totalInquiries || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    From contact & property forms
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-stat-quotes">
                <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Quote Requests
                  </CardTitle>
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-quote-requests">
                    {stats?.quoteRequests || 0}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Service inquiries
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-stat-testimonials">
                <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Testimonials
                  </CardTitle>
                  <Star className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-testimonials">
                    {stats?.totalTestimonials || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Client reviews
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Available Properties</span>
                    <span className="font-semibold text-green-600">
                      {stats?.availableProperties || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sold Properties</span>
                    <span className="font-semibold text-primary">
                      {stats?.soldProperties || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inquiry Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Contact Form</span>
                    <span className="font-semibold">{stats?.contactInquiries || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Property Inquiries</span>
                    <span className="font-semibold">{stats?.propertyInquiries || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Quote Requests</span>
                    <span className="font-semibold">{stats?.quoteRequests || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
