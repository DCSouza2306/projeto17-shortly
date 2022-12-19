import connection from "../database/db.js";

export async function getUsers(req, res) {
  try {
    const userId = req.userId;

    const userData = await connection.query(
      `SELECT 
      users.id, 
      users.name, 
      SUM (urls.count) AS "visitCount"
    FROM users
    JOIN urls ON users.id = urls.id_user
    WHERE users.id = ${userId}
    GROUP BY users.id;`
    );

    const shortenData = await connection.query(`
      SELECT id, "shortUrl", url, "count" AS "visitCount" 
      FROM urls 
      WHERE id_user = ${userId}
      ORDER BY "count" DESC`);

    userData.rows[0] = { ...userData.rows[0], shortenedUrls: shortenData.rows };

    res.send(userData.rows[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = await connection.query(`
      SELECT 
	       users.id, 
	       users.name, 
  	  COUNT (urls.count) AS "linkCount",
	    COALESCE(SUM (urls.count),0) AS "visitCount"
      FROM users
      LEFT JOIN urls ON users.id = urls.id_user
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10;`);
    res.send(ranking.rows)
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
