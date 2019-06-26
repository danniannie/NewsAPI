const connection = require("../connection");

fetchUser = username => {
  return connection("users")
    .where("username", username.username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Error 404: Page Not Found"
        });
      }
      return user[0];
    });
};

module.exports = { fetchUser };
