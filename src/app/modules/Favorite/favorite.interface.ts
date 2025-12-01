import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
  user: Types.ObjectId;
  property: Types.ObjectId;
  createdAt?: Date;
}