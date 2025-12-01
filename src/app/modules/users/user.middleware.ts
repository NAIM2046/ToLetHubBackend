import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
    const ACCESS_TOKEN_SECRET = config.access_token as string;
    if (!token) return res.status(401).json({ message: "Access token missing" });
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid access token" });
      (req as any).user = user;
      next();
    }
    );
};
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden: You don't have enough permissions" });
        }
        next();
    };
};