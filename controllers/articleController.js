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
  const article = req.params;
  const votesToAdd = req.body.inc_votes;
  console.log(votesToAdd);
  updateArticle(article, votesToAdd)
    .then(([updatedArticle]) => {
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};
