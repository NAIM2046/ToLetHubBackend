import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertiesByUser,
} from "./property.controller";

const router = express.Router();

// 🏠 Create new property
router.post("/", createProperty);

// 📋 Get all properties
router.get("/", getAllProperties);

// 🔍 Get single property by ID
router.get("/:id", getPropertyById);

// ✏️ Update property by ID
router.put("/:id", updateProperty);

// ❌ Delete property by ID
router.delete("/:id", deleteProperty);

// 👤 Get all properties posted by a specific user
router.get("/user/:userId", getPropertiesByUser);

export default router;
