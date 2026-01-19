import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertyInquirySchema, insertContactInquirySchema, insertQuoteRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
