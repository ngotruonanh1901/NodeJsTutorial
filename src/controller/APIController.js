import pool from "../configs/connectDB";

let getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");
  return res.status(200).json({
    data: rows,
  });
};

// create new user
let createNewUser = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      message: "Missing",
    });
  }
  await pool.execute("INSERT INTO user(email, password) values (?, ?)", [
    email,
    password,
  ]);
  return res.status(200).json({
    message: "Ok",
  });
};

// deleteUser
let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(500).json({
      message: "Missing",
    });
  }
  await pool.execute("DELETE FROM user WHERE id = ?", [userId]);
  return res.status(200).json({
    message: "Ok",
  });
};

// update user
let updateUser = async (req, res) => {
  let { id, email, password } = req.body;
  if (!id || !email || !password) {
    return res.status(500).json({
      message: "Missing",
    });
  }
  await pool.execute("UPDATE user SET email = ?, password = ? WHERE id = ?", [
    email,
    password,
    id,
  ]);
  return res.status(200).json({
    message: "Ok",
  });
};


let login = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return (
      res.status(500),
      json({
        errCode: 1,
        message: "missing",
      })
    );
  }

  return res.status(200).json({
    errCode: 0,
    message: "Ok",
  });
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  login,
};
