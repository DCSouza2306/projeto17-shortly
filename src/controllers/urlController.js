import connection from "../database/db.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwyz", 6);

export async function postUrl(req, res) {
  try {
    const idUser = req.userId;
    const { url } = req.url;
    let shortUrl = url;
    shortUrl = nanoid();

    await connection.query(
      `INSERT INTO urls (id_user, url, "shortUrl") VALUES ($1,$2,$3)`,
      [idUser,url, shortUrl]
    );
    res.status(201).send({ shortUrl });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  try {
    const { id } = req.params;
    const url = await connection.query(
      `SELECT id,"shortUrl", url FROM urls WHERE id = $1`,
      [id]
    );

    if (!url.rows[0])
      return res.status(404).send({ message: "Url não existe" });
    res.status(200).send(url.rows[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getOpenUrl(req, res) {
  try {
    const { shortUrl } = req.params;

    const document = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl" = '${shortUrl}'`
    );


    if (!document.rows[0]) return res.sendStatus(404);

    const count = document.rows[0].count + 1;
    const url = document.rows[0].url;

    await connection.query(`UPDATE urls SET count = ${count} WHERE "shortUrl" = '${shortUrl}'`);

    res.redirect(`${url}`);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  try {
    const urlId = req.urlId;

    await connection.query(`DELETE FROM urls WHERE id = ${urlId}`);

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
