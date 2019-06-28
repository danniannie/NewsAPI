const connection = require("../db/connection");
exports.updateComment = (comment_id, votes) => {
  return connection("comments")
    .where({ comment_id })
    .increment({ votes })
    .returning("*");
};

exports.removeComment = comment_id => {
  return connection("comments")
    .where({ comment_id })
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Error 404: Page Not Found"
        });
      }
    })
    .then(() => {
      return connection("comments")
        .where({ comment_id })
        .del();
    });
};
