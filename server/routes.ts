import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertyInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/property-inquiries", async (req, res) => {
    try {
      const validatedData = insertPropertyInquirySchema.parse(req.body);
      const inquiry = await storage.createPropertyInquiry(validatedData);
      res.status(201).json({ success: true, inquiry });
    } catch (error) {
      console.error("Property inquiry error:", error);
      res.status(400).json({ success: false, error: "Invalid inquiry data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
