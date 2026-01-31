import { 
  type User, type InsertUser, 
  type PropertyInquiry, type InsertPropertyInquiry, 
  type ContactInquiry, type InsertContactInquiry,
  type QuoteRequest, type InsertQuoteRequest,
  type Property, type InsertProperty,
  type Testimonial, type InsertTestimonial,
  users, propertyInquiries, contactInquiries, quoteRequests, properties, testimonials 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import crypto from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAdminUser(user: InsertUser): Promise<User>;
  createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry>;
  getPropertyInquiries(): Promise<PropertyInquiry[]>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
  
  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getVisibleTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
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

  async createAdminUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser,
      isAdmin: true,
    }).returning();
    console.log("👤 Admin user created:", user.username);
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

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
  }

  // Properties CRUD
  async getProperties(): Promise<Property[]> {
    return db.select().from(properties).orderBy(desc(properties.createdAt));
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db.insert(properties).values(insertProperty).returning();
    console.log("🏠 New Property Created:", property.title);
    return property;
  }

  async updateProperty(id: string, updateData: Partial<InsertProperty>): Promise<Property | undefined> {
    const [property] = await db
      .update(properties)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    if (property) {
      console.log("🏠 Property Updated:", property.title);
    }
    return property;
  }

  async deleteProperty(id: string): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id)).returning();
    if (result.length > 0) {
      console.log("🏠 Property Deleted:", result[0].title);
      return true;
    }
    return false;
  }

  // Testimonials CRUD
  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getVisibleTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.isVisible, true)).orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    console.log("⭐ New Testimonial Created:", testimonial.name);
    return testimonial;
  }

  async updateTestimonial(id: string, updateData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [testimonial] = await db
      .update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id))
      .returning();
    if (testimonial) {
      console.log("⭐ Testimonial Updated:", testimonial.name);
    }
    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    if (result.length > 0) {
      console.log("⭐ Testimonial Deleted:", result[0].name);
      return true;
    }
    return false;
  }
}

export const storage = new DatabaseStorage();
