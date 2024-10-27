import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import UserModel from '../models/User';
import bcrypt from "bcrypt";
import { User } from "../constants/Interfaces";

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

}


// (DESC) Logout User
async function logoutUser(req: Request, res: Response, next: NextFunction) {

}


// (DESC) Check if User Is Authenticated
async function isAuth(req: Request, res: Response, next: NextFunction) {

}


export { createUser, loginUser, logoutUser, isAuth };