import { Request, Response } from "express";
import { userServices } from './user.service';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import config from "../../config";

const JWT_SECRET = config.jwt_token as string;


 export const registerUser = async(req:Request , res:Response) =>{
    try {
         const { name, email, phone, password, googleId } = req.body;

    // check existing
    const existing = await userServices.findUserByIdentifier(email || phone || "");
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await userServices.createUser({ name, email, phone, password, googleId });
    res.status(201).json({ message: "User registered successfully", user });
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
}
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password, googleId } = req.body;

    let user;

    if (googleId) {
      user = await userServices.findUserByGoogleId(googleId);
    } else {
      user = await userServices.findUserByIdentifier(identifier);
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = user.password && (await bcrypt.compare(password, user.password));
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user?._id, role: user?.role },JWT_SECRET , { expiresIn: "7d" });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


