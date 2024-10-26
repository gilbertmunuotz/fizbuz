// *** Import Router & Controller Func *** //
import { Router } from "express";
import { LoginMiddleware } from '../middlewares/Login';
import { RegistrationMiddleware } from '../middlewares/Register';
import { createUser, loginUser, logoutUser, isAuth } from '../controllers/Auth';


// **** Functions **** //
//Initiate Express Router
const router = Router();


/* Register Route */
router.post('/register', RegistrationMiddleware, createUser);


/* Login Route */
router.post('/login', LoginMiddleware, loginUser);


/* Logout Route */
router.delete('/logout', logoutUser);


/* (GET) Check if User Is Authenticated */
router.get('/isAuth', isAuth);


// **** Export default **** //
export default router;