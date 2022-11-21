import pool from "../configs/connectDB";

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

module.exports = {
  login,
};
