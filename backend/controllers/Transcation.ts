import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import TransactionModel from "../models/Transactions";


//(DESC) Create New Transaction
async function createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {

    // Destructure Request Body and explicitly type it
    const { name, amount, type } = req.body;

    // Get userId from session
    const userId = req.session.userId;

    if (!userId) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ status: "Error", Message: "User not Authenticated" });
        return;
    }

    try {

        // Create new Transaction using only the required fields
        const Transaction = await TransactionModel.create({ name, amount, type, userId });
        res.status(HttpStatusCodes.CREATED).send({ status: 'Success', message: 'Trasaction Created Succesfully', Transaction });

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


//(DESC) Get Single Transaction 
async function getTransaction(req: Request, res: Response, next: NextFunction) {

    // Get userId from session
    const userId = req.session.userId;
    console.log("User ID from session:", userId); // Log the userId

    if (!userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ Status: "Error", Message: "Invalid Or No Id Found" });
        return;
    }

    console.log("Session Object:", req.session); // Log the entire session


    try {
        const transaction = await TransactionModel.findOne({ where: { userId: userId } });

        if (!transaction) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ Status: 'Error', Message: "Transaction Not Found" });
            return;
        } else {
            res.status(HttpStatusCodes.OK).json({ Status: "Success", transaction });
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

export { createTransaction, getTransaction };