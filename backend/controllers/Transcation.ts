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


//(DESC) Get All Transactions
async function getTransactions(req: Request, res: Response, next: NextFunction) {

    // Get userId from session
    const userId = req.session.userId;

    if (!userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ Status: "Error", Message: "Invalid Or No Id Found" });
        return;
    }

    try {
        const transaction = await TransactionModel.findAll({ where: { userId: userId } });

        if (transaction.length === 0) {
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


//(DESC) Get Single Transaction
async function getTransaction(req: Request, res: Response, next: NextFunction) {

    // Destructure id from params
    const { id } = req.params;

    // Check if `id` is available
    if (!id) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ Status: "Error", Message: "Transaction ID is required" });
        return;
    }

    // Get userId from session
    const userId = req.session.userId;

    try {
        const transaction = await TransactionModel.findOne({ where: { id: id, userId: userId } });

        if (!transaction) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ Status: 'Error', Message: "Transaction Not Found" });
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


//(DESC) Delete Single Transaction
async function deleteTransaction(req: Request, res: Response, next: NextFunction) {

    // Destructure id from params
    const { id } = req.params;

    // Get userId from session
    const userId = req.session.userId;

    if (!id && !userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ Status: "Error", Message: "Invalid ID or User not authenticated" });
        return;
    }

    try {
        const deletedTransactionCount = await TransactionModel.destroy({ where: { id: id, userId: userId }, });

        // Check if the transaction was deleted
        if (deletedTransactionCount === 0) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ Status: 'Error', Message: "Transaction Not Found" });
            return;
        }
        
        // If the transaction was deleted successfully
        res.status(HttpStatusCodes.OK).json({ Status: "Success", Message: "Transaction Deleted Successfully" });

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


export { createTransaction, getTransactions, getTransaction, deleteTransaction };