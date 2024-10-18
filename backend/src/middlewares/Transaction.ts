import { Request, Response, NextFunction } from 'express';
import Joi from "joi";
import HttpStatusCodes from "../constants/HttpStatusCodes";

export function TransactionMiddleware(req: Request, res: Response, next: NextFunction) {
    // Perform Validation
    const transactionSchema = Joi.object().keys({
        transaction: Joi.string().required(),
        amount: Joi.number().required(),
        categoryType: Joi.string().required(),
    }).options({ abortEarly: false });

    // Store Error in an Object
    const { error } = transactionSchema.validate(req.body, { abortEarly: false });

    //Check If Validation succeeded
    if (error) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: error.details.map(detail => detail.message) });
    }

    next();
}