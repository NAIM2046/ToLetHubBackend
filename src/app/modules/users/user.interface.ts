import { Document } from "mongoose";

export interface TUser extends Document{
    name:string ,
    email?:string,
    phone?:string ,
    googleId?:string,
    password?:string,
    profileImage?:string ,
    role: "user"|"admin" ,
     createdAt?: Date;
    updatedAt?: Date;
}