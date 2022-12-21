import connection from "../database/db.js";

export async function insertSession(id, token) {
  return connection.query(
    `INSERT INTO sessions (id_user, token) VALUES ($1,$2)`,
    [id, token]
  );
}
