import pool from "../configs/connectDB";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        resolve();
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your Email is not Exist";
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// sign up
let register = (fullname, email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        resolve();
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your Email is Exist";
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// check email exist in db
// still error
let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await pool.execute("SELECT email FROM user WHERE email = ?", [
        userEmail,
      ]);
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  login,
  register,
  hashPassword,
};
