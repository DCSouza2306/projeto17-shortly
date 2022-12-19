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

export async function urlUserVerify(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const urlExist = await connection.query(`SELECT * FROM urls WHERE id = ${id}`);

    if (!urlExist.rows)
      return res.status(404).send({ message: "Url inexistente" });

    const userUrlVerify = await connection.query(
      `SELECT * FROM urls WHERE id_user = ${userId}`
    );

    if (!userUrlVerify.rows)
      return res
        .status(401)
        .send({ message: "Url não pertence a esse usuário" });
    req.urlId = id;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
