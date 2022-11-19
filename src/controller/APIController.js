import pool from "../configs/connectDB";

let getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.status(200).json({
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { lastName } = req.body;
  if (!lastName) {
    return res.status(200).json({
      message: "missing",
    });
  }

  await pool.execute("INSERT INTO users(name) values (?)", [lastName]);
  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing",
    });
  }

  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.status(200).json({
    message: "ok",
  });
};

let updateUser = async (req, res) => {
  let { id, lastName } = req.body;
  if (!lastName || !id) {
    return res.status(200).json({
      message: "missing",
    });
  }

  await pool.execute("UPDATE USERS SET name = ? WHERE id = ?", [lastName, id]);
  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
