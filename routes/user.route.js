
import { Router } from "express";
import {login,getAllUsers,register} from "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { validateUser } from "../models/users.model.js";
const userRouter = Router();


userRouter.post('/login',joiValidator(validateUser.login),login)

userRouter.get('/',getAllUsers)

userRouter.post('/register',joiValidator(validateUser.register),register)


export default userRouter;


