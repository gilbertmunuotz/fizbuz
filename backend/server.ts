// *** Import npm packages *** //
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
// Load env variables
dotenv.config();
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "./constants/HttpStatusCodes";
import TransactionRoute from './routes/Transcation';
import AuthRoutes from './routes/Auth';
import UserRoutes from "./routes/User";
import { expressSessions } from "./middlewares/Sessions";
import { USERS_URL } from "./constants/Constant";


// **** Setup **** //

// Initiate Express
const app = express();

// Basic middleware
app.use(express.json());
app.use(cors({ origin: `${USERS_URL}`, methods: ["GET", "PUT", "POST", "DELETE"], credentials: true }));
app.use(expressSessions());

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


//Define Routes Here
app.use('/api/v1/transactions', TransactionRoute); // Transactions Related Routes
app.use('/api/v1/auth', AuthRoutes); // Authentication Related Routes
app.use('/api/v1/users', UserRoutes); // Users Related Routes

// Listen to Server Response
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});


// **** Export default **** //
export default app;