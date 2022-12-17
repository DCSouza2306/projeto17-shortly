import { usersSchema } from "../models/usersSchema.js";
import connection from "../database/db.js";

export const signupBodyValidation = async (req, res, next) => {
  const user = req.body;
  const { error } = usersSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: errors });
  }

  const emailExist = await connection.query(
    `SELECT * FROM users WHERE email = $1`,
    [user.email]
  );

  if (emailExist.rows) {
    return res.status(409).send({ message: "Email já cadastrado" });
  }

  req.user = user;

  next();
};
