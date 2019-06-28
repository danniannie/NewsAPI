exports.formatDate = list => {
  return list.map(({ created_at, ...listDatum }) => {
    return {
      created_at: new Date(created_at),
      ...listDatum
    };
  });
};

exports.makeRefObj = (list, key, value) => {
  return list.reduce((lookup, article) => {
    lookup[article[key]] = article[value];
    return lookup;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(({ created_by, belongs_to, ...commentDatum }) => {
    return {
      article_id: articleRef[belongs_to],
      author: created_by,
      ...commentDatum
    };
  });
};
