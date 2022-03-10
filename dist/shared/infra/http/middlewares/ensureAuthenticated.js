"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("@shared/errors/AppError");

var _auth = _interopRequireDefault(require("@config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" "); // Since i don't need the first item of the authHeader, I will get the second by using [, secondItem]

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token); // The second parameter is the secret key that I have created for the AuthenticateUserUseCase. Using as IPayload is forcing the verify to return a sub.

    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid Token!", 401);
  }
}