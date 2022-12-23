import { findUsersRanking, findUsersCount } from "../repository/usersRepository.js";

export async function getUsers(req, res) {
  try {
    const userId = req.userId;

    const {rows} = await findUsersCount(userId)
  

    res.send(rows[0]);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getRanking(req, res) {
  try {
    const {rows} = await findUsersRanking();
    res.send(rows)
  } catch (e) {
    res.status(500).send(e);
  }
}
