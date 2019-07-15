const cors = require("cors");
const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
app.use(cors());
const {
  handles500errors,
  send404errors,
  handleCustomErrors,
  handles400errors,
  handlesPSQL422errors
} = require("./errors/errors");

app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", send404errors);

app.use(handleCustomErrors);
app.use(handlesPSQL422errors);
app.use(handles400errors);
app.use(handles500errors);
module.exports = app;
