const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

//takes an array of objects, for each object in the array, accesses the timestamp value and uses this to convert into the correct type and reassign this key to the new value

//
//returns a new array and does not mutate the original data

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

describe("makeRefObj", () => {});

describe("formatComments", () => {});
