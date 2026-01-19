import { type User, type InsertUser, type PropertyInquiry, type InsertPropertyInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry>;
  getPropertyInquiries(): Promise<PropertyInquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private propertyInquiries: Map<string, PropertyInquiry>;

  constructor() {
    this.users = new Map();
    this.propertyInquiries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPropertyInquiry(insertInquiry: InsertPropertyInquiry): Promise<PropertyInquiry> {
    const id = randomUUID();
    const inquiry: PropertyInquiry = { ...insertInquiry, id };
    this.propertyInquiries.set(id, inquiry);
    console.log("📧 New Property Inquiry Received:");
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
    return Array.from(this.propertyInquiries.values());
  }
}

export const storage = new MemStorage();
