const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDate", () => {
  it("returns an empty array when passed an empty array", () => {
    const actual = formatDate([]);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("returns an array of one object with the correct timestamp", () => {
    const actual = formatDate([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("returns an array of objects with their date updated", () => {
    const actual = formatDate([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body: "We all love Mitch",
        created_at: 1163852514171
      }
    ]);
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1289996514171)
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body: "We all love Mitch",
        created_at: new Date(1163852514171)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("does not mutate the inputted array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const actual = formatDate(input);
    expect(actual).to.not.equal(input);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("returns an object from an array with one element", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        article_id: 1
      }
    ];
    const actual = makeRefObj(input, "title", "article_id");
    const expected = { "Living in the shadow of a great man": 1 };
    expect(actual).to.eql(expected);
  });
  it("returns an object from an array of numerous elements", () => {
    const input = [
      {
        title: "A",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        article_id: 1
      },
      {
        title: "B",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        article_id: 3
      },
      {
        title: "C",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        article_id: 2
      }
    ];
    const actual = makeRefObj(input, "title", "article_id");
    const expected = {
      A: 1,
      B: 3,
      C: 2
    };
    expect(actual).to.eql(expected);
  });
});

describe("formatComments", () => {
  it("returns an empty object when passed an empty array", () => {
    const actual = formatComments([], {});
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("returns an updated array with one object", () => {
    const actual = formatComments(
      [
        {
          body: "Superficially charming",
          belongs_to: "Living in the shadow of a great man",
          created_by: "icellusedkars",
          votes: 0,
          created_at: 1259066163389
        }
      ],
      {
        "Living in the shadow of a great man": 1
      }
    );
    const expected = [
      {
        body: "Superficially charming",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: 1259066163389
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("returns an updated array with multiple objects", () => {
    const actual = formatComments(
      [
        {
          body: "A",
          belongs_to: "C",
          created_by: "icellusedkars",
          votes: 0,
          created_at: 1259066163389
        },
        {
          body: "B",
          belongs_to: "D",
          created_by: "icellusedkars",
          votes: 0,
          created_at: 1259066163389
        }
      ],
      {
        C: 1,
        D: 2
      }
    );
    const expected = [
      {
        body: "A",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: 1259066163389
      },
      {
        body: "B",
        article_id: 2,
        author: "icellusedkars",
        votes: 0,
        created_at: 1259066163389
      }
    ];
    expect(actual).to.eql(expected);
  });
});
