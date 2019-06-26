const { fetchArticlesbyID, updateArticle } = require("../models/articleModel");

exports.getArticlesbyID = (req, res, next) => {
  const article_id = req.params;
  fetchArticlesbyID(article_id)
    .then(([article]) => {
      return res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  if (Object.keys(req.body).length > 1) {
    return next({ status: 400, msg: "Bad Request" });
  }
  const article = req.params;
  const votesToAdd = req.body.inc_votes;
  console.log(votesToAdd);
  updateArticle(article, votesToAdd)
    .then(([updatedArticle]) => {
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};
