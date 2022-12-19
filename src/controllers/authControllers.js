import connection from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function postSignUp(req, res) {
  const { name, email, password } = req.user;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await connection.query(
      `INSERT INTO users (name, email, password) 
        VALUES($1,$2,$3)`,
      [name, email, passwordHash]
    );
    res.send(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function postLogin(req, res) {
  const user = req.user;
  const token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_JWT, {
    expiresIn: 86400,
  });

  try {
    await connection.query(
      `INSERT INTO sessions (id_user, token) VALUES ($1,$2)`,
      [user.rows[0].id, token]
    );

    res.status(200).send({token});
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
