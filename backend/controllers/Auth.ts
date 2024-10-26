import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import UserModel from '../models/User';

//(DESC) Create New User
async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {

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