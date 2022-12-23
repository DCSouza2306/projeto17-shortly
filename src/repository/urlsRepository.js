import connection from "../database/db.js";

export async function getUrlById(id) {
  return connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

export async function getUrlByUserId(userId) {
  return connection.query(`SELECT * FROM urls WHERE id_user = $1`, [userId]);
}

export async function getUrlByShortUrl(shortUrl) {
  return connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [
    shortUrl
  ]);
}

export async function insertUrl(idUser, url, shortUrl) {
  return connection.query(
    `INSERT INTO urls (id_user, url, "shortUrl") VALUES ($1,$2,$3)`,
    [idUser, url, shortUrl]
  );
}

export async function updateUrlCount(count, shortUrl) {
  return connection.query(
    `UPDATE urls SET count = $1 WHERE "shortUrl" = $2`,[count, shortUrl]
  );
}

export async function deleteUrlById(id){
    return connection.query(`DELETE FROM urls WHERE id = $1`, [id]);
}
