import mysql from "mysql2/promise";
// const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejs",
});

export default pool;
