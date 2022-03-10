"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url
  }) {
    // static method allows me to call it without instantiating the class
    const user = (0, _classTransformer.classToClass)({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;