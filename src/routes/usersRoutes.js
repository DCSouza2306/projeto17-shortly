import { Router } from "express";
import authValidation from "../middlewares/authValidation.middleware.js";
import { getUsers } from "../controllers/usersController.js";

const router = Router();

router.get("/users/me", authValidation, getUsers)

export default router;