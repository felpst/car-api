"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(request, response) {
    const {
      id
    } = request.user; // Receive file

    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });
    return response.status(204).send(); // 204 is when a change has been made, but there is nothing to be returned in the response's body.
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;