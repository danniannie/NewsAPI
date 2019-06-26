const express = require("express");
const articlesRouter = express.Router();
const {
  getArticlesbyID,
  patchArticle,
  postComment
} = require("../controllers/articleController");
const { send405error } = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(getArticlesbyID)
  .patch(patchArticle)
  .all(send405error);

articlesRouter.route("/:article_id/comments").post(postComment);

module.exports = articlesRouter;
