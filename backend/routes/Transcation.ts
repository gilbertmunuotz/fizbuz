// *** Import Router & Controller Func *** //
import { Router } from "express";
import { authMiddleware } from "../middlewares/Auth";
import { transactionMiddleware } from '../middlewares/Transaction';
import { createTransaction, getTransaction } from '../controllers/Transcation';

// **** Functions **** //
//Initiate Express Router
const router = Router();

/* POST New Transaction */
router.post('/new', authMiddleware, transactionMiddleware, createTransaction);


/* GET All Transactions */
router.get('/transaction', authMiddleware, getTransaction);


// **** Export default **** //
export default router;