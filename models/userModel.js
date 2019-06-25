const connection = require("../connection");

fetchUser = username => {
  return connection("users")
    .where("username", username.username)
    .then(user => user[0]);
};

module.exports = { fetchUser };
