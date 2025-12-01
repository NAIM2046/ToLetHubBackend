import { model, Schema } from "mongoose";
import { IFavorite } from "./favorite.interface";

const favoriteSchema = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// prevent duplicate favorite
favoriteSchema.index({ user: 1, property: 1 }, { unique: true });

export const Favorite = model<IFavorite>("Favorite", favoriteSchema);