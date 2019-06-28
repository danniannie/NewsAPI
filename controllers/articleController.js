const {
  fetchArticles,
  updateArticle,
  createComment,
  fetchCommentsbyID
} = require("../models/articleModel");

exports.patchArticle = (req, res, next) => {
  if (Object.keys(req.body).length > 1) {
    return next({ status: 400, msg: "Bad Request" });
  }
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticle(article_id, inc_votes)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  if (Object.keys(req.body).length > 2) {
    return next({ status: 400, msg: "Bad Request" });
  }
  const { article_id } = req.params;
  const { username, body } = req.body;
  createComment(article_id, username, body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const article_id = req.params;
  fetchCommentsbyID(article_id, req.query)
    .then(comments => {
      return res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getArticlesbyID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticles(article_id)
    .then(([article]) => {
      return res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchArticles(null, sort_by, order, author, topic)
    .then(articles => {
      return res.status(200).send({ articles });
    })
    .catch(next);
};
