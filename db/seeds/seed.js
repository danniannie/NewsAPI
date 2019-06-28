const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../index.js");

const { formatDate, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics")
        .insert(topicData)
        .returning("*");
      const usersInsertions = knex("users")
        .insert(userData)
        .returning("*");
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(([topics, users]) => {
      const formattedArticleData = formatDate(articleData);
      return knex("articles")
        .insert(formattedArticleData)
        .returning("*");
    })
    .then(articleRows => {
      const refObj = makeRefObj(articleRows, "title", "article_id");
      const formattedDate = formatDate(commentData);
      const formattedCommentData = formatComments(formattedDate, refObj);
      return knex("comments")
        .insert(formattedCommentData)
        .returning("*");
    });
};
