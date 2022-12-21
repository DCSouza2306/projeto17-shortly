import { Router } from "express";
import create from "../controllers/authControllers.js";
import { loginValidation, signupValidation } from "../middlewares/authValidation.middleware.js";

const router = Router();

router.post("/signup", signupValidation, create.signUp)

router.post("/signin", loginValidation, create.login)

export default router;