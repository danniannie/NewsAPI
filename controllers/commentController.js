const { updateComment } = require("../models/commentModel");

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comment_id, inc_votes)
    .then(([updatedComment]) => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};
