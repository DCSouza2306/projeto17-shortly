import { Router } from "express";
import authValidation from "../middlewares/authValidation.middleware.js";
import { urlBodyValidation } from "../middlewares/urlsValidation.middleware.js";
import { postUrl, getUrl } from "../controllers/urlController.js";

const router = Router();

router.post("/urls/shorten",authValidation, urlBodyValidation, postUrl);

router.get("/urls/:id", getUrl);

router.get("/urls/open/:shortUrl", getOpenUrl)

export default router;