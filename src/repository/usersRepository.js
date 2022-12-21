import connection from "../database/db.js";

export async function getUserById(id) {
  return connection.query(`SELECT * FROM users WHERE id = $1`, [id]);
}

export async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export async function insertUsers(name, email, password) {
  return connection.query(
    `INSERT INTO users (name, email, password) 
          VALUES($1,$2,$3)`,
    [name, email, password]
  );
}
