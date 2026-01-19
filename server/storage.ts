import { 
  type User, type InsertUser, 
  type PropertyInquiry, type InsertPropertyInquiry, 
  type ContactInquiry, type InsertContactInquiry,
  type QuoteRequest, type InsertQuoteRequest,
  users, propertyInquiries, contactInquiries, quoteRequests 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry>;
  getPropertyInquiries(): Promise<PropertyInquiry[]>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createPropertyInquiry(insertInquiry: InsertPropertyInquiry): Promise<PropertyInquiry> {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    
    await db.insert(propertyInquiries).values({
      ...insertInquiry,
      id,
    });
    
    const inquiry: PropertyInquiry = {
      id,
      fullName: insertInquiry.fullName,
      phone: insertInquiry.phone,
      email: insertInquiry.email ?? null,
      message: insertInquiry.message,
      propertyTitle: insertInquiry.propertyTitle,
      propertyLocation: insertInquiry.propertyLocation,
      propertyPrice: insertInquiry.propertyPrice,
      propertyType: insertInquiry.propertyType,
      createdAt,
    };
    
    console.log("📧 New Property Inquiry Saved to Database:");
    console.log("   ID:", inquiry.id);
    console.log("   Timestamp:", inquiry.createdAt);
    console.log("   Property:", inquiry.propertyTitle);
    console.log("   Location:", inquiry.propertyLocation);
    console.log("   Price:", inquiry.propertyPrice);
    console.log("   Type:", inquiry.propertyType);
    console.log("   From:", inquiry.fullName);
    console.log("   Phone:", inquiry.phone);
    console.log("   Email:", inquiry.email || "Not provided");
    console.log("   Message:", inquiry.message);
    return inquiry;
  }

  async getPropertyInquiries(): Promise<PropertyInquiry[]> {
    return db.select().from(propertyInquiries);
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    
    await db.insert(contactInquiries).values({
      ...insertInquiry,
      id,
    });
    
    const inquiry: ContactInquiry = {
      id,
      name: insertInquiry.name,
      email: insertInquiry.email,
      phone: insertInquiry.phone ?? null,
      service: insertInquiry.service,
      message: insertInquiry.message,
      createdAt,
    };
    
    console.log("📧 New Contact Inquiry Saved to Database:");
    console.log("   ID:", inquiry.id);
    console.log("   Timestamp:", inquiry.createdAt);
    console.log("   From:", inquiry.name);
    console.log("   Email:", inquiry.email);
    console.log("   Phone:", inquiry.phone || "Not provided");
    console.log("   Service:", inquiry.service);
    console.log("   Message:", inquiry.message);
    return inquiry;
  }

  async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    
    await db.insert(quoteRequests).values({
      ...insertRequest,
      id,
    });
    
    const request: QuoteRequest = {
      id,
      companyName: insertRequest.companyName,
      contactName: insertRequest.contactName,
      email: insertRequest.email,
      phone: insertRequest.phone,
      serviceType: insertRequest.serviceType,
      projectLocation: insertRequest.projectLocation,
      projectScope: insertRequest.projectScope,
      timeline: insertRequest.timeline,
      budget: insertRequest.budget ?? null,
      createdAt,
    };
    
    console.log("📧 New Quote Request Saved to Database:");
    console.log("   ID:", request.id);
    console.log("   Timestamp:", request.createdAt);
    console.log("   Company:", request.companyName);
    console.log("   Contact:", request.contactName);
    console.log("   Email:", request.email);
    console.log("   Phone:", request.phone);
    console.log("   Service:", request.serviceType);
    console.log("   Location:", request.projectLocation);
    console.log("   Timeline:", request.timeline);
    console.log("   Budget:", request.budget || "Not specified");
    return request;
  }
}

export const storage = new DatabaseStorage();
