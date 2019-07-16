const connection = require("../db/connection");

exports.updateArticle = (article_id, votes) => {
  return connection("articles")
    .where({ article_id })
    .increment({ votes })
    .returning("*");
};

exports.createComment = (article_id, author, body) => {
  return connection
    .insert({ author, body, article_id })
    .into("comments")
    .returning("*");
};

exports.fetchCommentsbyID = (
  { article_id },
  { sort_by = "created_at", order }
) => {
  if (order === undefined) {
    order = "desc";
  }
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by, order);
};

exports.fetchArticles = ({
  article_id,
  sort_by = "created_at",
  order = "desc",
  author,
  topic,
  limit = 10
}) => {
  const possibles = [undefined, "asc", "desc"];
  if (!possibles.includes(order)) {
    return Promise.reject({
      status: 404,
      msg: "Error 404: Page Not Found"
    });
  }

  return connection
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .limit(limit)
    .modify(query => {
      if (article_id) query.where({ "articles.article_id": article_id });
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ "articles.topic": topic });
    })
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Error 404: Page Not Found"
        });
      }
      return articles;
    });
};
