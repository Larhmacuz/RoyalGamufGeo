import { type User, type InsertUser, type PropertyInquiry, type InsertPropertyInquiry, users, propertyInquiries } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry>;
  getPropertyInquiries(): Promise<PropertyInquiry[]>;
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
}

export const storage = new DatabaseStorage();
