// *** Import Router & Controller Func *** //
import { Router } from "express";
import { TransactionMiddleware } from '../middlewares/Transaction';
import { createTransaction } from '../controllers/Transcation';

// **** Functions **** //
//Initiate Express Router
const router = Router();

/* POST New Transaction */
router.post('/new', TransactionMiddleware, createTransaction);


// **** Export default **** //
export default router;