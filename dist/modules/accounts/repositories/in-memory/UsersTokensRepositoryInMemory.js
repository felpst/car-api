"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("@modules/accounts/infra/typeorm/entities/UserTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.userTokens = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.userTokens.find(ut => ut.user_id === user_id && ut.refresh_token == refresh_token);
    return userToken;
  }

  async deleteById(id) {
    const userToken = this.userTokens.find(ut => ut.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.userTokens.find(ut => ut.refresh_token == refresh_token);
    return userToken;
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;