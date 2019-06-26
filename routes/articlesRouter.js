const express = require("express");
const articlesRouter = express.Router();
const {
  getArticlesbyID,
  patchArticle
} = require("../controllers/articleController");
const { send405error } = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(getArticlesbyID)
  .patch(patchArticle)
  .all(send405error);

module.exports = articlesRouter;
