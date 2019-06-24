//create a file to require each of the data depending on the env state
const ENV = process.env.NODE_ENV || "development";

const testData = require("./test-data");
const devData = require("./development-data");

const data = { development: devData, test: testData };

module.exports = data[ENV];
