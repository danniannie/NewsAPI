const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../controllers/userController");
const { send405error } = require("../errors/errors");

usersRouter
  .route("/:username")
  .get(getUser)
  .all(send405error);

module.exports = usersRouter;
