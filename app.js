const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const { handles500errors, send404errors } = require("./errors/errors");

app.use("/api", apiRouter);
app.all("/*", send404errors);

app.use(handles500errors);
module.exports = app;
