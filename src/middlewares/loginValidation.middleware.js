import connection from "../database/db.js";
import bcrypt from "bcrypt";
import { loginSchema } from "../models/usersSchema.js";

export async function loginValidation(req, res, next) {
  const user = req.body;
  const { email, password } = user;

  const { error } = loginSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: errors });
  }

  try {
    const userExist = await connection.query(`SELECT * FROM users WHERE email = $1`,[email])
    if (!userExist.rows)
      return res.status(401).send({ message: "Email ou senha invalidos" });

    const passwordValidation = bcrypt.compareSync(password, userExist.rows[0].password);
    if (!passwordValidation)
      return res.status(401).send({ message: "senha invalidos" });

    req.user = userExist;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
