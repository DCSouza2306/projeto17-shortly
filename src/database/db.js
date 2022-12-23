import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
/*   host: "localhost",
  port: 5432,
  user: "postgres",
  password: "copadomundo2306",
  database: "shortly_api", */
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export default connection;
