exports.handles500errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: err.message });
};

exports.send404errors = (req, res, next) => {
  res.status(404).send({ msg: "Error 404: Page Not Found" });
};

exports.send405error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
