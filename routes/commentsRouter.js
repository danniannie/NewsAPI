const express = require("express");
const commentsRouter = express.Router();
const {
  patchComment,
  deleteComment
} = require("../controllers/commentController");
const { send405error } = require("../errors/errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment)
  .all(send405error);

module.exports = commentsRouter;
