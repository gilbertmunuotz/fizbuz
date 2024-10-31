import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import UserModel, { UserAttributes } from '../models/User';
import bcrypt from "bcrypt";
import { User } from '../constants/Interfaces';

// Extend the Express.Session interface
declare module 'express-session' {
    interface Session {
        userId?: string;
    }
}

//(DESC) Create New User
async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {

    // Destructure Request Body and explicitly type it
    const { name, email, password }: User = req.body;

    // Check if User Exists
    try {
        const existingUser = await UserModel.findOne({ where: { email } });

        if (existingUser) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Email already exists!' });
        }

        //Hash Password Using Bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create New User
        const user = await UserModel.create({ name, email, password: hashedPassword });

        res.status(HttpStatusCodes.CREATED).json({ message: 'User Registered successfully', user });

    } catch (error) {
        console.error("Error Registering User", error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        next(error);
    }

}


// (DESC) Login User
async function loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Destructure req.body and Explicitly Type
    const { email, password }: UserAttributes = req.body;

    try {
        // Find if Existing User Exists
        const user = await UserModel.findOne({ where: { email } });

        // If Not found(404)
        if (!user) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ status: 'Error', message: 'User Not Found' });
            return;
        }

        // Compare user Password & hash it
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If Password is Not Valid
        if (!isPasswordValid) {
            res.status(HttpStatusCodes.UNAUTHORIZED).json({ status: 'Error', message: 'Invalid Email or Password' });
            return;
        }

        // Store user Id in session safely
        req.session.userId = user.id.toString(); // Convert user ID to a string

        // Call save on the session
        req.session.save((error) => {
            if (error) {
                return next(error); // Handle session save error
            }
            res.status(HttpStatusCodes.OK).json({ status: 'Success', message: 'Logged in successfully' });
        });

    } catch (error) {
        console.error("Error Logging In", error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        next(error);
    }
}


// (DESC) Logout User
async function logoutUser(req: Request, res: Response, next: NextFunction) {

    // Destroy user Sessions
    req.session.destroy((error => {
        if (error) {
            console.error('Error destroying session:', error);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ status: "Error", Message: "Error logging out" });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid', { path: '/' });
        res.status(HttpStatusCodes.OK).json({ status: "Success", Message: "Logout successfully" });
    }))
}


export { createUser, loginUser, logoutUser };