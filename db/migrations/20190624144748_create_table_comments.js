exports.up = function(knex, Promise) {
  console.log("...creating comments table");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").notNullable();
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.string("body", 10000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("...removing comments table");
  return knex.schema.dropTable("comments");
};
