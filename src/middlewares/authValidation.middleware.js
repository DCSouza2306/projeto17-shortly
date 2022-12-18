import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connection from "../database/db.js";

dotenv.config();

export default async function authValidation(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    const parts = authorization.split(" ");

    if (parts.length !== 2) return res.sendStatus(401);

    const [schema, token] = parts;

    if (schema !== "Bearer") return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error)
        return res.status(401).send({ message: "Token inválido ou expirado" });

      const user = await connection.query(
        `SELECT * FROM users WHERE id = ${decoded.id}`
      );

      if (!user.rows || !user.rows[0].id)
        return res.status(404).send({ message: "Usuário não encontrado" });

      req.userId = user.rows[0].id;
      return next();
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
