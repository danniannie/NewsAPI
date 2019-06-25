const express = require("express");
const topicRouter = express.Router();
const { getTopics } = require("../controllers/topicController");
const { send405error } = require("../errors/errors");

topicRouter
  .route("/")
  .get(getTopics)
  .all(send405error);

module.exports = topicRouter;
