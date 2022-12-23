import { urlSchema } from "../models/Url.js";
import { getUrlById, getUrlByUserId } from "../repository/urlsRepository.js";
import { schemaValidation } from "./schemaValidate.middleware.js";

export async function urlBodyValidation(req, res, next) {
  const url = req.body;

  const errors  = schemaValidation(urlSchema, url, res)

  if(errors){
    return errors;
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
