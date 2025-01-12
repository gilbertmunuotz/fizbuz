// *** Import Router & Controller Func *** //
import { Router } from "express";
import { LoginMiddleware } from '../middlewares/Login';
import { RegistrationMiddleware } from '../middlewares/Register';
import { createUser, loginUser, getSessionInfo, logoutUser } from '../controllers/Auth';


// **** Functions **** //
//Initiate Express Router
const router = Router();


/* Register Route */
router.post('/register', RegistrationMiddleware, createUser);


/* Login Route */
router.post('/login', LoginMiddleware, loginUser);


/* Session Route */
router.get('/info/:id', getSessionInfo);


/* Logout Route */
router.delete('/logout', logoutUser);


// **** Export default **** //
export default router;