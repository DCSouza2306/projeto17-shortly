import { Router } from "express";
import {signupBodyValidation} from '../middlewares/signUpBodyValidation.middleware.js'
import { postSignUp } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", signupBodyValidation, postSignUp)

export default router;