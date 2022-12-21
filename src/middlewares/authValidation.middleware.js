import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connection from "../database/db.js";
import bcrypt from "bcrypt";
import { loginSchema, usersSchema } from "../models/Users.js";
import { getUserById, getUserByEmail } from "../repository/usersRepository.js";

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

      const { rows } = await getUserById(decoded.id);

      if (!rows[0])
        return res.status(404).send({ message: "Usuário não encontrado" });

      req.userId = rows[0].id;
      return next();
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function loginValidation(req, res, next) {
  const user = req.body;
  const { email, password } = user;

  const { error } = loginSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: errors });
  }

  try {
    const { rows } = await getUserByEmail(email);
    if (!rows[0])
      return res.status(401).send({ message: "Email ou senha invalidos" });

    const passwordValidation = bcrypt.compareSync(password, rows[0].password);
    if (!passwordValidation)
      return res.status(401).send({ message: "senha invalidos" });

    req.user = rows[0];
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function signupValidation(req, res, next) {
  const user = req.body;
  const { error } = usersSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: errors });
  }

  const { rows } = await getUserByEmail(user.email);

  if (rows[0]) {
    return res.status(409).send({ message: "Email já cadastrado" });
  }

  req.user = user;

  next();
}
