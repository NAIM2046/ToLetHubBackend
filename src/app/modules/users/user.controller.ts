import { Request, Response } from "express";
import { userServices } from './user.service';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import config from "../../config";

const ACCESS_TOKEN_SECRET = config.access_token as string;
const REFRESH_TOKEN_SECRET = config.refresh_token as string;



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

    const accessToken = jwt.sign({ id: user?._id, role: user?.role }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user?._id, role: user?.role }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    
    res.status(200).json({ message: "Login successful" , accessToken  });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  } 
};
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No token provided" });
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      const accessToken = jwt.sign({ id: decoded.id, role: decoded.role }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
      const newRefreshToken = jwt.sign({ id: decoded.id, role: decoded.role }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
    }
    );
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await userServices.findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


