const { fetchArticlesbyID } = require("../models/articleModel");

exports.getArticlesbyID = (req, res, next) => {
  const article_id = req.params;
  fetchArticlesbyID(article_id)
    .then(([article]) => {
      return res.status(200).send({ article });
    })
    .catch(next);
};
