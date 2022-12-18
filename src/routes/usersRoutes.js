import { Router } from "express";
import authValidation from "../middlewares/authValidation.middleware.js";
import { getUsers, getRanking } from "../controllers/usersController.js";

const router = Router();

router.get("/users/me", authValidation, getUsers);

router.get("/ranking", getRanking)

export default router;