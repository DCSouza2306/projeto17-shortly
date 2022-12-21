import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertSession } from "../repository/sessionsRepository.js";
import { insertUsers } from "../repository/usersRepository.js";

async function signUp(req, res) {
  const { name, email, password } = req.user;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await insertUsers(name, email, passwordHash);
    res.send(200);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function login(req, res) {
  const {id} = req.user;
  const token = jwt.sign({ id: id }, process.env.SECRET_JWT, {
    expiresIn: 86400,
  });

  try {
    await insertSession(id, token);
    res.status(200).send({token});
  } catch (e) {
    res.status(500).send(e);
  }
}

const create = {
  login,
  signUp
};

export default create;