import pool from "../configs/connectDB";
import userService from "../services/userService";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);


// get all data user
let getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");
  return res.status(200).json({
    data: rows,
  });
};

// create new user
let createNewUser = async (req, res) => {
  let { fullname, email, password } = req.body;
  let hashPasswordLibrary = await hashPassword(password);
  if (!fullname || !email || !password) {
    return res.status(500).json({
      message: "Missing",
    });
  }
  await pool.execute(
    "INSERT INTO user(fullname, email, password) values (?, ?, ?)",
    [fullname, email, hashPasswordLibrary]
  );
  return res.status(200).json({
    message: "Ok!",
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
    message: "Ok!",
  });
};

// update user
let updateUser = async (req, res) => {
  let { id, fullname, email, password } = req.body;
  if ((!id || !fullname, !email || !password)) {
    return res.status(500).json({
      message: "Missing",
    });
  }
  await pool.execute(
    "UPDATE user SET fullname = ?, email = ?, password = ? WHERE id = ?",
    [fullname, email, password, id]
  );
  return res.status(200).json({
    message: "Ok!",
  });
};

// login event
// let handleLogin = async (req, res) => {
//   let { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "missing",
//     });
//   }
//   let userData = await userService.login(email, password);
//   return res.status(200).json({
//     userData,
//   });
// };

// sign up event
// let handleRegister = async (req, res) => {
//   let { fullname, email, password } = req.body;
//   if (!fullname || !email || !password) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "missing",
//     });
//   }
//   let userData = await userService.register(fullname, email, password);
//   return res.status(200).json({
//     userData,
//   });
// };

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  // handleLogin,
  // handleRegister,
};
