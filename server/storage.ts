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
import { sql } from "drizzle-orm";
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
  getTestimonial(id: string): Promise<Testimonial | undefined>;
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
    try {
      const result = await db.execute(sql`SELECT id, username, password, is_admin::text as is_admin_text FROM users WHERE username = ${username}`);
      if (result && result.rows && result.rows.length > 0) {
        const row = result.rows[0] as any;
        return {
          id: row.id,
          username: row.username,
          password: row.password,
          isAdmin: row.is_admin_text === 'true' || row.is_admin_text === 't',
        };
      }
      return undefined;
    } catch (error) {
      console.error("Error fetching user:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createAdminUser(insertUser: InsertUser): Promise<User> {
    const id = crypto.randomUUID();
    await db.insert(users).values({
      id,
      ...insertUser,
      isAdmin: true,
    });
    console.log("👤 Admin user created:", insertUser.username);
    return {
      id,
      username: insertUser.username,
      password: insertUser.password,
      isAdmin: true,
    };
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
    const id = crypto.randomUUID();
    const now = new Date();
    const propertyData = {
      id,
      title: insertProperty.title,
      type: insertProperty.type,
      category: insertProperty.category,
      location: insertProperty.location,
      size: insertProperty.size,
      price: insertProperty.price,
      description: insertProperty.description,
      features: insertProperty.features || [],
      images: insertProperty.images || [],
      status: insertProperty.status || "available",
      createdAt: now,
      updatedAt: now,
    };
    await db.insert(properties).values(propertyData);
    console.log("🏠 New Property Created:", insertProperty.title);
    return propertyData;
  }

  async updateProperty(id: string, updateData: Partial<InsertProperty>): Promise<Property | undefined> {
    await db
      .update(properties)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(properties.id, id));
    const updated = await this.getProperty(id);
    if (updated) {
      console.log("🏠 Property Updated:", updated.title);
    }
    return updated;
  }

  async deleteProperty(id: string): Promise<boolean> {
    const property = await this.getProperty(id);
    if (!property) return false;
    await db.delete(properties).where(eq(properties.id, id));
    console.log("🏠 Property Deleted:", property.title);
    return true;
  }

  // Testimonials CRUD
  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getVisibleTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.isVisible, true)).orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = crypto.randomUUID();
    const now = new Date();
    const testimonialData = {
      id,
      name: insertTestimonial.name,
      company: insertTestimonial.company,
      content: insertTestimonial.content,
      rating: insertTestimonial.rating,
      isVisible: insertTestimonial.isVisible ?? true,
      createdAt: now,
    };
    await db.insert(testimonials).values(testimonialData);
    console.log("⭐ New Testimonial Created:", insertTestimonial.name);
    return testimonialData;
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    try {
      const result = await db.select().from(testimonials).where(eq(testimonials.id, id));
      return result && result.length > 0 ? result[0] : undefined;
    } catch {
      return undefined;
    }
  }

  async updateTestimonial(id: string, updateData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    await db
      .update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id));
    const updated = await this.getTestimonial(id);
    if (updated) {
      console.log("⭐ Testimonial Updated:", updated.name);
    }
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const testimonial = await this.getTestimonial(id);
    if (!testimonial) return false;
    await db.delete(testimonials).where(eq(testimonials.id, id));
    console.log("⭐ Testimonial Deleted:", testimonial.name);
    return true;
  }
}

export const storage = new DatabaseStorage();
