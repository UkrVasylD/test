const CustomError = require("../errorHandler/index.js");

const userProvider = require("../providers/user.js");

console.log(userProvider);

const crypto = require("crypto");

// const UsersModel = require("../models/users");
const { prepareToken } = require("../utils/token");

class UsersServices {
  async singIn({ email, userName, password }) {
    if (!email && !userName) {
      throw new CustomError("Email or user name is required", 400);
    }
    if (!password) {
      throw new CustomError("Enter some password, please", 400);
    }

    const response = await UsersServices.singIn({
      email,
      userName,
      password,
    });
    res.send("singIn text");
  }
  async singUp({ email, userName, password }) {
    if (!email && !userName && !password) {
      throw new CustomError("Fill all fields, please", 400);
    }

    const { salt, hash } = this.#setPassword(password);

    await userProvider.signUp({ email, userName, salt, hash });

    const response = await UsersServices.singUp({
      email,
      userName,
      password,
    });
    res.send("singIn text");
  }

  #setPassword = function (password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 512, "sha512")
      .toString("hex");

    return { salt, hash };
  };

  #validPassword = function (password) {
    //---------------
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    //-----------------------
    return this.hash === hash;
  };
}

module.exports = { usersServices: new UsersServices() };
