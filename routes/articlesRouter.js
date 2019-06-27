const express = require("express");
const articlesRouter = express.Router();
const {
  getArticles,
  getArticlesbyID,
  patchArticle,
  postComment,
  getComments
} = require("../controllers/articleController");
const { send405error } = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(getArticlesbyID)
  .patch(patchArticle)
  .all(send405error);

articlesRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComment)
  .all(send405error);

articlesRouter.route("/").get(getArticles);

module.exports = articlesRouter;
