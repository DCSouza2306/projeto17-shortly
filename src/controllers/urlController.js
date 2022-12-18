import connection from "../database/db.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwyz", 6);

export async function postUrl(req, res) {
  try {
    const { url } = req.url;
    let shortUrl = url;
    shortUrl = nanoid();

    await connection.query(
      `INSERT INTO urls (url, "shortUrl") VALUES ($1,$2)`,
      [url, shortUrl]
    );

    res.status(201).send({shortUrl})
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
