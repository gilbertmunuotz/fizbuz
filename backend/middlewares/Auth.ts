import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { Session } from "express-session";

// Extend the Express.Session interface
declare module 'express-session' {
    interface Session {
        userId?: string;
    }
}

// (DESC) Check if User Is Authenticated
async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {

    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ status: "Error", Message: "User Unathorized" });
    }
}

export { authMiddleware };