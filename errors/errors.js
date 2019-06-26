exports.send404errors = (req, res, next) => {
  res.status(404).send({ msg: "Error 404: Page Not Found" });
};

exports.send405error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handles500errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: err.message });
};
