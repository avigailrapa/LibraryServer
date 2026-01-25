
import { Router } from "express";
import {login,getAllUsers,register} from "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { validateUser } from "../models/users.model.js";
import { auth,isAdmin } from "../middlewares/checkAuth.middleware.js";
const userRouter = Router();

userRouter.get('/',auth,isAdmin,getAllUsers)

userRouter.post('/login',joiValidator(validateUser.login),login)

userRouter.post('/register',joiValidator(validateUser.register),register)


export default userRouter;


