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
      `INSERT INTO urls (url, "shortUrl") VALUES ($1,$2)`,
      [url, shortUrl]
    );

    const id = await connection.query(`SELECT * FROM urls ORDER BY id DESC`);

    await connection.query(
      `INSERT INTO creates (id_user, id_url) VALUES ($1,$2)`,
      [idUser, id.rows[0].id]
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

export async function getOpenUrl(req, res){
    try{
        const {shortUrl} = req.params;
        
    } catch(e){
        console.log(e);
        res.sendStatus(500)
    }
}