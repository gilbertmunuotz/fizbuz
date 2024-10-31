// *** Import Router & Controller Func *** //
import { Router } from "express";
import { transactionMiddleware } from '../middlewares/Transaction';
import { createTransaction } from '../controllers/Transcation';
import { authMiddleware } from "../middlewares/Auth";

// **** Functions **** //
//Initiate Express Router
const router = Router();

/* POST New Transaction */
router.post('/new', authMiddleware, transactionMiddleware, createTransaction);


/* GET All Transactions */
router.get('/transactions');


// **** Export default **** //
export default router;