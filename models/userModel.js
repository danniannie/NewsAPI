const connection = require("../connection");

fetchUser = username => {
  return connection("users")
    .where("username", username)
    .returning("*")
    .then(user => user);
};

module.exports = { fetchUser };
