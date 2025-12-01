import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertiesByUser,
} from "./property.controller";
import { authenticateUser } from "../users/user.middleware";

const router = express.Router();

// 🏠 Create new property
router.post("/", authenticateUser, createProperty);

// 📋 Get all properties
router.get("/", getAllProperties);

// 🔍 Get single property by ID
router.get("/:id", getPropertyById);

// ✏️ Update property by ID
router.put("/:id",authenticateUser , updateProperty);

// ❌ Delete property by ID
router.delete("/:id",authenticateUser, deleteProperty);

// 👤 Get all properties posted by a specific user
router.get("/user/:userId",authenticateUser, getPropertiesByUser);

export default router;
