import { urlSchema } from "../models/Url.js";
import { getUrlById, getUrlByUserId } from "../repository/urlsRepository.js";

export async function urlBodyValidation(req, res, next) {
  const url = req.body;

  const { error } = urlSchema.validate(url, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: errors });
  }

  req.url = url;

  next();
}

export async function urlUserVerify(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const urlExist = await getUrlById(id);
    if (!urlExist.rows)
      return res.status(404).send({ message: "Url inexistente" });

    const userUrlVerify = await getUrlByUserId(userId);
    if (!userUrlVerify.rows)
      return res
        .status(401)
        .send({ message: "Url não pertence a esse usuário" });
  
    req.urlId = id;
    next();
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
}
