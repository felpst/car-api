"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// I am creating this interface to avoid the return to contain the password.
let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(UserRepository, usersTokensRepository, dateProvider) {
    this.UserRepository = UserRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    // Checking if the user exists
    const user = await this.UserRepository.findByEmail(email);
    const {
      secret_refresh_token,
      secret_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = _auth.default;

    if (!user) {
      throw new _AppError.AppError("Email or password incorrect!");
    } // Checking if the password given is correct


    const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError("Email or password incorrect!");
    } // Gerar jsonwebtoken


    const token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    }); // Since this function doesn't return a promise, I don't need to use await. I can never pass the password inside the sign function, only noncritical information as the first parameter. The second parameter is the scret code that I can give to generate the sign (for this I will be using a md5 generated hash). The third parameter is a object that receives as its first item a subject that for this case will be the user's id, and also a expires in that will tell the program when the token will experie (for this I will be using 1 day).

    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);
    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    });
    const tokenReturn = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    };
    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;