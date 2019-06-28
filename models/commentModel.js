const connection = require("../db/connection");
exports.updateComment = (comment_id, votes) => {
  return connection("comments")
    .where({ comment_id })
    .increment({ votes })
    .returning("*");
};
