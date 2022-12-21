import { customAlphabet } from "nanoid";
import {
  getUrlById,
  getUrlByShortUrl,
  insertUrl,
  updateUrlCount,
} from "../repository/urlsRepository.js";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwyz", 6);

export async function postUrl(req, res) {
  try {
    const idUser = req.userId;
    const { url } = req.url;
    let shortUrl = url;
    shortUrl = nanoid();

    await insertUrl(idUser, url, shortUrl);
    res.status(201).send({ shortUrl });
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getUrl(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await getUrlById(id);
    if (!rows[0]) return res.status(404).send({ message: "Url não existe" });
    const objectSend = {
      id: rows.id,
      shortUrl: rows.shortUrl,
      url: rows.url,
    };
    res.status(200).send(objectSend);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getOpenUrl(req, res) {
  try {
    const { shortUrl } = req.params;

    const { rows } = await getUrlByShortUrl(shortUrl);

    if (!rows[0]) return res.sendStatus(404);

    const count = rows[0].count + 1;
    const url = rows[0].url;

    await updateUrlCount(count, shortUrl);

    res.redirect(`${url}`);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteUrl(req, res) {
  try {
    const urlId = req.urlId;

    await deleteUrl(urlId);

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
