import express from "express";
import APIController from "../controller/APIController";
let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/user", APIController.getAllUser);
  router.post("/create-user", APIController.createNewUser);
  router.put("/update-user", APIController.updateUser);
  router.delete("/delete-user/:id", APIController.deleteUser);

  //user action
  router.post("/login", APIController.handleLogin);
  router.post("/register", APIController.handleRegister);

  return app.use("/api/v1/", router);
};

export default initAPIRoute;
