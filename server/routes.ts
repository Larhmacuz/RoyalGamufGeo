import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPropertyInquirySchema, 
  insertContactInquirySchema, 
  insertQuoteRequestSchema,
  insertPropertySchema,
  insertTestimonialSchema 
} from "@shared/schema";
import session from "express-session";
import bcrypt from "bcryptjs";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    isAdmin?: boolean;
  }
}

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "royal-gamuf-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  // Admin Authentication Routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || !user.isAdmin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      req.session.isAdmin = true;
      
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    if (req.session.isAdmin) {
      res.json({ authenticated: true });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Public Property Routes
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      const availableProperties = properties.filter(p => p.status === "available");
      res.json(availableProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  // Public Testimonials Route
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getVisibleTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Admin Dashboard Stats
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const [properties, contactInquiries, quoteRequests, propertyInquiries, testimonials] = await Promise.all([
        storage.getProperties(),
        storage.getContactInquiries(),
        storage.getQuoteRequests(),
        storage.getPropertyInquiries(),
        storage.getTestimonials(),
      ]);
      
      res.json({
        totalProperties: properties.length,
        availableProperties: properties.filter(p => p.status === "available").length,
        soldProperties: properties.filter(p => p.status === "sold").length,
        totalInquiries: contactInquiries.length + quoteRequests.length + propertyInquiries.length,
        contactInquiries: contactInquiries.length,
        quoteRequests: quoteRequests.length,
        propertyInquiries: propertyInquiries.length,
        totalTestimonials: testimonials.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Admin Property Routes
  app.get("/api/admin/properties", requireAdmin, async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.post("/api/admin/properties", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json({ success: true, property });
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(400).json({ error: "Invalid property data" });
    }
  });

  app.put("/api/admin/properties/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const property = await storage.updateProperty(id, req.body);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json({ success: true, property });
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(400).json({ error: "Failed to update property" });
    }
  });

  app.delete("/api/admin/properties/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProperty(id);
      if (!deleted) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  });

  // Admin Testimonial Routes
  app.get("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json({ success: true, testimonial });
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.put("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.updateTestimonial(id, req.body);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json({ success: true, testimonial });
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(400).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTestimonial(id);
      if (!deleted) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // Admin Inquiries Routes
  app.get("/api/admin/contact-inquiries", requireAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.get("/api/admin/quote-requests", requireAdmin, async (req, res) => {
    try {
      const requests = await storage.getQuoteRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  app.get("/api/admin/property-inquiries", requireAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getPropertyInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching property inquiries:", error);
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  // Public Form Submission Routes (existing)
  app.post("/api/property-inquiries", async (req, res) => {
    try {
      console.log("Received property inquiry data:", JSON.stringify(req.body, null, 2));
      const validatedData = insertPropertyInquirySchema.parse(req.body);
      const inquiry = await storage.createPropertyInquiry(validatedData);
      res.status(201).json({ success: true, inquiry });
    } catch (error) {
      console.error("Property inquiry error:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      res.status(400).json({ success: false, error: "Invalid inquiry data" });
    }
  });

  app.post("/api/contact-inquiries", async (req, res) => {
    try {
      console.log("Received contact inquiry data:", JSON.stringify(req.body, null, 2));
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json({ success: true, inquiry });
    } catch (error) {
      console.error("Contact inquiry error:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      res.status(400).json({ success: false, error: "Invalid contact inquiry data" });
    }
  });

  app.post("/api/quote-requests", async (req, res) => {
    try {
      console.log("Received quote request data:", JSON.stringify(req.body, null, 2));
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const request = await storage.createQuoteRequest(validatedData);
      res.status(201).json({ success: true, request });
    } catch (error) {
      console.error("Quote request error:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      res.status(400).json({ success: false, error: "Invalid quote request data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
