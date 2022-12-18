import connection from "../database/db.js";
import { urlSchema } from "../models/urlSchema.js";

export async function urlBodyValidation(req, res, next) {
  const url = req.body;

  const { error } = urlSchema.validate(url, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: errors });
  }

  req.url = url;

  next();
}