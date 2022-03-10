"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecicationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateSpecificationUseCase = require("./CreateSpecificationUseCase");

class CreateSpecicationController {
  async handle(request, response) {
    const {
      name,
      description
    } = request.body;

    const createSpecificationUseCase = _tsyringe.container.resolve(_CreateSpecificationUseCase.CreateSpecificationUseCase);

    await createSpecificationUseCase.execute({
      name,
      description
    });
    return response.status(201).send();
  }

}

exports.CreateSpecicationController = CreateSpecicationController;