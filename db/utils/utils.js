exports.formatDate = list => {
  if (list.length === 0) {
    return [];
  }
  const finalArray = [];
  finalArray.push(...list);
  finalArray.forEach(element => {
    let time = new Date(element.created_at);
    delete element.created_at;
    element.created_at = time;
  });

  return finalArray;
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
