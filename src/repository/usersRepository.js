import connection from "../database/db.js";

export async function findUserById(id) {
  return connection.query(`SELECT * FROM users WHERE id = $1`, [id]);
}

export async function findUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export async function insertUsers(name, email, password) {
  return connection.query(
    `INSERT INTO users (name, email, password) 
          VALUES($1,$2,$3)`,
    [name, email, password]
  );
}

export async function findUsersRanking() {
  return connection.query(`
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
}

export async function findUsersCount(id) {
  return connection.query(
    `SELECT 
      users.id, 
      users.name, 
      SUM (urls.count) AS "visitCount",
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id',urls.id,
          'shortUrl', urls."shortUrl", 
          'url', urls.url,
          'visitCount',urls.count)
        )
    FROM users
    LEFT JOIN urls ON users.id = urls.id_user
    WHERE users.id = $1
    GROUP BY users.id;`,
    [id]
  );
}
