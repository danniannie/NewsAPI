const connection = require("../connection");

exports.fetchArticlesbyID = ({ article_id }) => {
  return connection
    .select("articles.*")
    .where("articles.article_id", article_id)
    .count({ comment_count: "comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.comment_id")
    .groupBy("articles.article_id");
};
