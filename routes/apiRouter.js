const express = require("express");
const apiRouter = express.Router();
const topicRouter = require("./topicRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const { send405error } = require("../errors/errors");

apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.route("/").all(send405error);

module.exports = apiRouter;
