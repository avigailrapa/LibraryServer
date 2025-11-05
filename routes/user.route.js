
import { Router } from "express";
import {login,getAllUsers,signin} from "../controllers/user.controller.js";
const userRouter = Router();


userRouter.post('/login',login)


userRouter.get('/',getAllUsers)


userRouter.post('/signin',signin)


export default userRouter;


