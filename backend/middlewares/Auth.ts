import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";

// Extend the Express.Session interface
declare module 'express-session' {
    interface Session {
        userId?: string;
    }
}

// (DESC) Check if User Is Authenticated
async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.session) {
        next();
    } else {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ status: "Error", message: "Session Null or Expired" });
    }
}

export { authMiddleware };