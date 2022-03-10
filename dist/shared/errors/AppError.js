"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;

class AppError {
  // readonly makes attribute available only to be read.
  constructor(message, statusCode = 400) {
    this.message = void 0;
    this.statusCode = void 0;
    // Stastus code here is given a default value of 400 if there is no value assigned to it.
    this.message = message;
    this.statusCode = statusCode;
  }

}

exports.AppError = AppError;