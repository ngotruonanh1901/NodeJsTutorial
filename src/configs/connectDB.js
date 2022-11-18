// import mysql from "mysql2/promise"
const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodejs",
});

export default connection;
