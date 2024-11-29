import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import UserModel, { UserAttributes } from '../models/User';
import bcrypt from "bcrypt";
import { User } from '../constants/Interfaces';

//(DESC) Get User INfo
async function getUserInfo(req: Request, res: Response, next: NextFunction) {

    // Destructure Request Params and explicitly type it
    const { id } = req.params;

    if (!id) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ Status: "Error", Message: "Invalid Or No Id Found" });
        return;
    }

    try {

        const user = await UserModel.findOne({ where: { id: id } })

        if (!user) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ Status: 'Error', Message: "User Not Found" });
            return;
        } else {
            res.status(HttpStatusCodes.OK).json({ user });
        }

    } catch (error) {
        // Log the error and pass it to the next middleware
        console.error('An Error Occurred, Please Try Again Later', error);

        // Send error response and call next() to pass the error to the error-handling middleware
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'An Error Occurred, Please Try Again Later'
        });
        next(error);
    }

}

export { getUserInfo };