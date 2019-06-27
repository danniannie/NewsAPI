const express = require("express");
const commentsRouter = express.Router();
const { patchComment } = require("../controllers/commentController");
const { send405error } = require("../errors/errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .all(send405error);

module.exports = commentsRouter;
