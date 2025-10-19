import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name: {
        type:String ,
        trim:true,
    },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true, trim: true },
    googleId: { type: String, unique: true, sparse: true },
    password: { type: String, minlength: 6, select: false },
    profileImage: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
} ,
{timestamps:true}
)
export const User = model<TUser>("User" , userSchema) ;