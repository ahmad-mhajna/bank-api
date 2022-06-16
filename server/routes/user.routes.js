const express = require("express");
const UserRouter = express.Router();
const {
  getUsers,
  getUser,
  postUser,
  deleteUser,
  putUser,
  getUsersByAmount,
  getUsersByIsActive,
} = require("../controllers/user.controller");
UserRouter.get("/users", getUsers);
UserRouter.get("/users/:id", getUser);
UserRouter.get("/users/amount/:amount", getUsersByAmount);
UserRouter.get("/users/isActive/:isActive", getUsersByIsActive);
UserRouter.post("/users", postUser);
UserRouter.delete("/users/:id", deleteUser);
UserRouter.put("/users/:type", putUser);
module.exports = UserRouter;
