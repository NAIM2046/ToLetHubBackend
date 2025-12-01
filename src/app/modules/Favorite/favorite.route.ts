// routes/favorite.routes.ts
import express from "express";
import { getMyFavorites, toggleFavorite } from "./favorite.controller";
import { authenticateUser } from "../users/user.middleware";



const router = express.Router();

// Toggle favorite
router.post("/:propertyId/toggle", authenticateUser, toggleFavorite);

// Get current user's favorites
router.get("/me", authenticateUser, getMyFavorites);


export default router;
