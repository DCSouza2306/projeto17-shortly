import { Router } from "express";
import authValidation from "../middlewares/authValidation.middleware.js";
import { urlBodyValidation } from "../middlewares/urlBodyValidation.middleware.js";
import { postUrl } from "../controllers/urlController.js";

const router = Router();

router.post("/urls/shorten",authValidation, urlBodyValidation, postUrl)

export default router;