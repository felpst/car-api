"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgottenPasswordEmailController = void 0;

var _tsyringe = require("tsyringe");

var _SendForgottenPasswordEmailUseCase = require("./SendForgottenPasswordEmailUseCase");

class SendForgottenPasswordEmailController {
  async handle(request, response) {
    const {
      email
    } = request.body;

    const sendForgottenPasswordEmailUseCase = _tsyringe.container.resolve(_SendForgottenPasswordEmailUseCase.SendForgottenPasswordEmailUseCase);

    await sendForgottenPasswordEmailUseCase.execute(email);
    return response.send();
  }

}

exports.SendForgottenPasswordEmailController = SendForgottenPasswordEmailController;