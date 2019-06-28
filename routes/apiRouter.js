const express = require("express");
const apiRouter = express.Router();
const topicRouter = require("./topicRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
const endpoints = require("../endpoints.json");
const { send405error } = require("../errors/errors");

apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter
  .route("/")
  .get((req, res, next) => {
    res.status(200).send(endpoints);
  })
  .all(send405error);

module.exports = apiRouter;
