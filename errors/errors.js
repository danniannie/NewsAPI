exports.handles400errors = (err, req, res, next) => {
  const errorCodes = ["22P02", "23502", "42703"];
  if (errorCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.send404errors = (req, res, next) => {
  res.status(404).send({ msg: "Error 404: Page Not Found" });
};

exports.send405error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handlesPSQL422errors = (err, req, res, next) => {
  const errorCodes = ["23503"];
  if (errorCodes.includes(err.code)) {
    res.status(422).send({ msg: "Unprocessable Request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handles500errors = (err, req, res, next) => {
  res.status(500).send({ msg: err.message });
};
