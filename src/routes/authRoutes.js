import { Router } from "express";
import {signupBodyValidation} from '../middlewares/signUpBodyValidation.middleware.js'
import { postSignUp, postLogin } from "../controllers/authControllers.js";
import { loginValidation } from "../middlewares/loginValidation.middleware.js";

const router = Router();

router.post("/signup", signupBodyValidation, postSignUp)

router.post("/signin", loginValidation, postLogin)

export default router;