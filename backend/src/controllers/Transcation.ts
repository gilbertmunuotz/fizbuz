import { Request, Response, NextFunction } from "express";
import TransactionModel from "../models/Transactions";
import sequelize from "../utilities/sequelize";
import HttpStatusCodes from "../constants/HttpStatusCodes";


//(DESC) Create New Note
async function createTransaction(req: Request<any>, res: Response, next: NextFunction) {

    // Destructure Request Body and explicitly type it
    const { transaction, amount, categoryType } = req.body;

    try {




    } catch (error) {
        console.error('An Error Occured, Please Try Again Later', error);
        res.status(HttpStatusCodes.SERVICE_UNAVAILABLE).send({ status: 'error', message: 'An Error Occured, Please Try Again Later' });
        next(error);
    }
}

export { createTransaction };