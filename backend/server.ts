// *** Import npm packages *** //
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
// Load env variables
dotenv.config();
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "./src/constants/HttpStatusCodes";

// Initiate Express
const app = express();


//Test Sample Route
app.get('/api', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Welcome Back To Fizbuz');
  } catch (error) {
    console.error('Error Getting Signal', error);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ status: 'error', message: 'Internal Server Error' });
    next(error);
  }
});

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(cors());

// Listen to Server Response
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});


// **** Export default **** //
export default app;