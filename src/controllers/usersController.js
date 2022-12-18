import connection from "../database/db.js";

export async function getUsers(req, res) {
  try {
    const userId = req.userId;

    const userData = await connection.query(
      `SELECT users.id, users.name, COUNT (acess.id) AS "visitCount"
    FROM users
    JOIN creates ON users.id = creates.id_user
    JOIN acess ON creates.id_url = acess.id_url
    JOIN urls ON urls.id = creates.id_url
    WHERE users.id = ${userId}
    GROUP BY users.id;`
    );

    const shortenData =
      await connection.query(`SELECT urls.id, urls."shortUrl", urls.url, COUNT(acess.id) AS "visitCount" 
    FROM urls
    JOIN acess ON acess.id_url = urls.id
    JOIN creates ON acess.id_url = creates.id_url
    WHERE creates.id_user = ${userId}
    GROUP BY urls.id, creates.id_user `);

    userData.rows[0] = {...userData.rows[0], shortenedUrls: shortenData.rows}

    res.send(userData.rows[0])
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
