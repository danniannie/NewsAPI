const connection = require("../connection");

exports.fetchArticlesbyID = ({ article_id }) => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.comment_id")
    .groupBy("articles.article_id")
    .modify(query => {
      if (article_id) query.where({ "articles.article_id": article_id });
    })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Error 404: Page Not Found"
        });
      }
      return article;
    });
};
