const express = require("express");
const usersRouter = express.Router();
const { send405error } = require("../errors/errors");
const { getUser } = require("../controllers/userController");

usersRouter.route("/:username").get(getUser);

module.exports = usersRouter;
