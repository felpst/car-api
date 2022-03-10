"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _SendForgottenPasswordEmailController = require("@modules/accounts/useCases/sendForgottenPasswordEmail/SendForgottenPasswordEmailController");

var _ResetPasswordUserController = require("@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgottenPasswordEmailController = new _SendForgottenPasswordEmailController.SendForgottenPasswordEmailController();
const resetPasswordController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRoutes.post("/forgot", sendForgottenPasswordEmailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);