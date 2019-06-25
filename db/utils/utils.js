// This utility function should be able to take an array(`list`) of objects and return a new array.Each item in the new array must have its timestamp converted into a Javascript date object.Everything else in each item must be maintained.

//   _hint: Think carefully about how you can test that this has worked - it's not by copying and pasting a sql timestamp from the terminal into your test_

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
