import { Request, Response } from "express";
import mongoose from "mongoose";
import { Favorite } from "./favortie.model";

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId))
      return res.status(400).json({ message: "Invalid property ID" });

    const existing = await Favorite.findOne({ user: userId, property: propertyId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ message: "Removed from favorites" });
    } else {
      await Favorite.create({ user: userId, property: propertyId });
      return res.status(200).json({ message: "Added to favorites" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
export const getMyFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const favorites = await Favorite.find({ user: userId }).populate("property");

    res.status(200).json({
      message: "Favorite properties fetched successfully",
      data: favorites.map((f) => f.property),
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};