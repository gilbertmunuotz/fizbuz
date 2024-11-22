// *** Import Router & Controller Func *** //
import { Router } from "express";
import { authMiddleware } from "../middlewares/Auth";
import { transactionMiddleware } from '../middlewares/Transaction';
import { createTransaction, getTransactions, getTransaction, deleteTransaction } from '../controllers/Transcation';

// **** Functions **** //
//Initiate Express Router
const router = Router();

/* POST New Transaction */
router.post("/new", authMiddleware, transactionMiddleware, createTransaction);


/* GET All Transactions */
router.get("/transactions/:userId", authMiddleware, getTransactions);


/* GET Single Transaction */
router.get("/transaction/:id", authMiddleware, getTransaction);


/* DELETE Single Transaction */
router.delete("/transaction/delete/:id", authMiddleware, deleteTransaction);


// **** Export default **** //
export default router;