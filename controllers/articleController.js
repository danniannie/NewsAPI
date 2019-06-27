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
  const article = req.params;
  const votesToAdd = req.body.inc_votes;

  updateArticle(article, votesToAdd)
    .then(([updatedArticle]) => {
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  if (Object.keys(req.body).length > 2) {
    return next({ status: 400, msg: "Bad Request" });
  }
  const article = req.params;
  const comment = req.body;
  createComment(article, comment)
    .then(([newComment]) => {
      res.status(201).send({ newComment });
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
  const { sort_by, order } = req.query;
  fetchArticles(null, sort_by, order)
    .then(article => {
      return res.status(200).send({ article });
    })
    .catch(next);
};
