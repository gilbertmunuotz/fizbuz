// *** Import Router & Controller Func *** //
import { Router } from "express";
import { UserMiddleware } from "../middlewares/User";
import { getUserInfo } from "../controllers/User";

// **** Functions **** //
//Initiate Express Router
const router = Router();


/* GET User Details*/
router.get("/user/:id", getUserInfo);


// **** Export default **** //
export default router;