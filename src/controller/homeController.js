import pool from "../configs/connectDB";

// get all user
let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");
  return res.render("index.ejs", { dataUser: rows });
};

// get detail user
let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM user WHERE id = ?", [userId]);
  return res.render("detail.ejs", { dataUser: user[0] });
};

// create user
let createNewUser = async (req, res) => {
  let { email, password } = req.body;
  await pool.execute("INSERT INTO user(email, password) values (?, ?)", [
    email,
    password,
  ]);
  return res.redirect("/");
};

// delete user
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM user WHERE id = ?", [userId]);
  return res.redirect("/");
};

// edit user
let getEditPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM user WHERE id = ?", [userId]);
  return res.render("update.ejs", { dataUser: user[0] });
};

let postEditPage = async (req, res) => {
  let { id, email, password } = req.body;
  await pool.execute("UPDATE user SET email = ?, password = ?  WHERE id = ?", [
    email,
    password,
    id,
  ]);
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postEditPage,
};
