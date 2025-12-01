import express, { Request, Response } from "express";
import { registerUser, loginUser, getMe, logoutUser, refreshToken } from "./user.controller";
import { authenticateUser } from "./user.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateUser, getMe)
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);
router.get("/test", (req: Request, res: Response) => {
    res.send("User route is working");
});

export default router;
