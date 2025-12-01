import { Document, Types } from "mongoose";


export type TProperty = {
    _id?: Types.ObjectId;                      
  userId: Types.ObjectId;                      
  
  // 🏘 Basic Info
  title: string;
  description: string;

  // 📍 Location
  division: string;
  district: string;
  area: string;
  address: string;

  // 💰 Rent Details
  rentAmount: number;
  rentType: "Monthly" | "Weekly" | "Daily"; // rent frequency
  availableFrom: string;              // Date in ISO string

  // 🏢 Property Details
  propertyType: "Flat" | "Room" | "Sublet" | "Apartment" | "Hostel";
  bedrooms?: number;
  bathrooms?: number;
  balcony?: number;
  floor?: number;
  totalFloors?: number;
  available: boolean;

  // ⚙️ Facilities
  facilities?: string[];              // eg: ["WiFi", "Gas", "Water"]

  // 🖼️ Images
  images: string[];                   // image URLs

  // 📞 Contact Info
  contactName: string;
  contactNumber: string;
  contactEmail?: string;
  sizeSqFt?: number;                   // size in square feet

  // 🕒 Metadata
  createdAt?: string;
  updatedAt?: string;
  status?: "active" | "rented" | "deleted";

  // ⭐ Optional / Future
  isVerified?: boolean;
  views?: number;
            
  coordinates?: {
    lat: number;
    lng: number;
  };
};
export type PropertyDocument = TProperty & Document;
