
import { Router } from "express";
import {login,getAllUsers,signin} from "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { userSchemas } from "../models/users.model.js";
const userRouter = Router();


userRouter.post('/login',joiValidator(userSchemas.login),login)

userRouter.get('/',getAllUsers)

userRouter.post('/signin',joiValidator(userSchemas.signin),signin)


export default userRouter;


