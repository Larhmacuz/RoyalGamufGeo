import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, FileText, Home, Mail, Phone, Calendar } from "lucide-react";
import type { ContactInquiry, QuoteRequest, PropertyInquiry } from "@shared/schema";

export default function AdminInquiries() {
  const [selectedItem, setSelectedItem] = useState<ContactInquiry | QuoteRequest | PropertyInquiry | null>(null);
  const [dialogType, setDialogType] = useState<"contact" | "quote" | "property" | null>(null);

  const { data: contactInquiries = [], isLoading: loadingContact } = useQuery<ContactInquiry[]>({
    queryKey: ["/api/admin/contact-inquiries"],
  });

  const { data: quoteRequests = [], isLoading: loadingQuotes } = useQuery<QuoteRequest[]>({
    queryKey: ["/api/admin/quote-requests"],
  });

  const { data: propertyInquiries = [], isLoading: loadingProperty } = useQuery<PropertyInquiry[]>({
    queryKey: ["/api/admin/property-inquiries"],
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openDetail = (item: ContactInquiry | QuoteRequest | PropertyInquiry, type: "contact" | "quote" | "property") => {
    setSelectedItem(item);
    setDialogType(type);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-inquiries-title">
            Inquiries
          </h1>
          <p className="text-muted-foreground">
            View and manage customer inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
              <CardTitle className="text-sm font-medium">Contact Form</CardTitle>
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactInquiries.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
              <CardTitle className="text-sm font-medium">Quote Requests</CardTitle>
              <FileText className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quoteRequests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
              <CardTitle className="text-sm font-medium">Property Inquiries</CardTitle>
              <Home className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{propertyInquiries.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="contact" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contact" data-testid="tab-contact">
              Contact ({contactInquiries.length})
            </TabsTrigger>
            <TabsTrigger value="quotes" data-testid="tab-quotes">
              Quotes ({quoteRequests.length})
            </TabsTrigger>
            <TabsTrigger value="property" data-testid="tab-property">
              Property ({propertyInquiries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card>
              <CardContent className="p-0">
                {loadingContact ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : contactInquiries.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    No contact inquiries yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactInquiries.map((inquiry) => (
                          <TableRow key={inquiry.id} data-testid={`row-contact-${inquiry.id}`}>
                            <TableCell className="font-medium">{inquiry.name}</TableCell>
                            <TableCell>{inquiry.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{inquiry.service}</Badge>
                            </TableCell>
                            <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDetail(inquiry, "contact")}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <Card>
              <CardContent className="p-0">
                {loadingQuotes ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : quoteRequests.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    No quote requests yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quoteRequests.map((request) => (
                          <TableRow key={request.id} data-testid={`row-quote-${request.id}`}>
                            <TableCell className="font-medium">{request.companyName}</TableCell>
                            <TableCell>{request.contactName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{request.serviceType}</Badge>
                            </TableCell>
                            <TableCell>{request.projectLocation}</TableCell>
                            <TableCell>{formatDate(request.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDetail(request, "quote")}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property">
            <Card>
              <CardContent className="p-0">
                {loadingProperty ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : propertyInquiries.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    No property inquiries yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {propertyInquiries.map((inquiry) => (
                          <TableRow key={inquiry.id} data-testid={`row-property-inq-${inquiry.id}`}>
                            <TableCell className="font-medium">{inquiry.fullName}</TableCell>
                            <TableCell>{inquiry.propertyTitle}</TableCell>
                            <TableCell>{inquiry.propertyLocation}</TableCell>
                            <TableCell>{inquiry.propertyPrice}</TableCell>
                            <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDetail(inquiry, "property")}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {dialogType === "contact" && "Contact Inquiry"}
                {dialogType === "quote" && "Quote Request"}
                {dialogType === "property" && "Property Inquiry"}
              </DialogTitle>
              <DialogDescription>
                Received {selectedItem && formatDate((selectedItem as any).createdAt)}
              </DialogDescription>
            </DialogHeader>

            {dialogType === "contact" && selectedItem && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{(selectedItem as ContactInquiry).name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{(selectedItem as ContactInquiry).service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${(selectedItem as ContactInquiry).email}`} className="text-primary hover:underline">
                    {(selectedItem as ContactInquiry).email}
                  </a>
                </div>
                {(selectedItem as ContactInquiry).phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${(selectedItem as ContactInquiry).phone}`} className="text-primary hover:underline">
                      {(selectedItem as ContactInquiry).phone}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Message</p>
                  <p className="bg-muted p-3 rounded-md">{(selectedItem as ContactInquiry).message}</p>
                </div>
              </div>
            )}

            {dialogType === "quote" && selectedItem && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{(selectedItem as QuoteRequest).companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{(selectedItem as QuoteRequest).contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${(selectedItem as QuoteRequest).email}`} className="text-primary hover:underline">
                    {(selectedItem as QuoteRequest).email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${(selectedItem as QuoteRequest).phone}`} className="text-primary hover:underline">
                    {(selectedItem as QuoteRequest).phone}
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <Badge>{(selectedItem as QuoteRequest).serviceType}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="font-medium">{(selectedItem as QuoteRequest).timeline}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{(selectedItem as QuoteRequest).projectLocation}</p>
                </div>
                {(selectedItem as QuoteRequest).budget && (
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">{(selectedItem as QuoteRequest).budget}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Project Scope</p>
                  <p className="bg-muted p-3 rounded-md">{(selectedItem as QuoteRequest).projectScope}</p>
                </div>
              </div>
            )}

            {dialogType === "property" && selectedItem && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Interested Property</p>
                  <p className="font-medium">{(selectedItem as PropertyInquiry).propertyTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedItem as PropertyInquiry).propertyLocation} - {(selectedItem as PropertyInquiry).propertyPrice}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{(selectedItem as PropertyInquiry).fullName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${(selectedItem as PropertyInquiry).phone}`} className="text-primary hover:underline">
                    {(selectedItem as PropertyInquiry).phone}
                  </a>
                </div>
                {(selectedItem as PropertyInquiry).email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${(selectedItem as PropertyInquiry).email}`} className="text-primary hover:underline">
                      {(selectedItem as PropertyInquiry).email}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Message</p>
                  <p className="bg-muted p-3 rounded-md">{(selectedItem as PropertyInquiry).message}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
