import { Request, Response, NextFunction } from 'express';
import Joi from "joi";
import HttpStatusCodes from "../constants/HttpStatusCodes";

export function transactionMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Define Validation Schema
    const transactionSchema = Joi.object().keys({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        type: Joi.string().required(),
        userId: Joi.number().required()
    }).options({ abortEarly: false });

    // Perform Validation
    const { error } = transactionSchema.validate(req.body);

    //Check If Validation succeeded
    if (error) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: error.details.map(detail => detail.message) });
    }

    next();
}