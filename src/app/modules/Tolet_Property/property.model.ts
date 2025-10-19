import mongoose, { Schema, model } from "mongoose";
import { PropertyDocument } from "./property.interface"; // ✅ adjust path if needed

const propertySchema = new Schema<PropertyDocument>(
  {
    // 👤 User who posted the property
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // 🏘 Basic Info
    title: { type: String, required: true },
    description: { type: String},

    // 📍 Location
    division: { type: String, required: true },
    district: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },

    // 💰 Rent Details
    rentAmount: { type: Number, required: true },
    rentType: { type: String, enum: ["Monthly", "Weekly", "Daily"], required: true },
    availableFrom: { type: String, required: true },

    // 🏢 Property Details
    propertyType: {
      type: String,
      enum: ["Flat", "Room", "Sublet", "Apartment", "Hostel"],
      required: true,
    },
    bedrooms: Number,
    bathrooms: Number,
    balcony: Number,
    floor: Number,
    totalFloors: Number,
    available: { type: Boolean, default: true },

    // ⚙️ Facilities
    facilities: [String],

    // 🖼️ Images
    images: { type: [String], required: true },

    // 📞 Contact Info
    contactName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    contactEmail: String,
    sizeSqFt: Number,

    // 🕒 Metadata
    status: { type: String, enum: ["active", "rented", "deleted"], default: "active" },

    // ⭐ Optional / Future
    isVerified: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],

    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

// Schema definition এর নিচে
propertySchema.index({
  title: "text",
  description: "text",
  area: "text",
  district: "text",
  division: "text",
});


export const Property = model<PropertyDocument>("Property", propertySchema);
