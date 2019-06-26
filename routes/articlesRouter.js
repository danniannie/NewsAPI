const express = require("express");
const articlesRouter = express.Router();
const { getArticlesbyID } = require("../controllers/articleController");
const { send405error } = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(getArticlesbyID)
  .all(send405error);

module.exports = articlesRouter;
