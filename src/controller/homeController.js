import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM USERS WHERE id = ?", [userId]);
  return res.send(user);
};

let createNewUser = async (req, res) => {
  let { lastName } = req.body;
  await pool.execute("INSERT INTO users(name) values (?)", [lastName]);
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
};
