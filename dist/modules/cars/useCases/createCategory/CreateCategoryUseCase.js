"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/errors/AppError");

var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  constructor( // This will create a command for the program to conduct a search in my conatiner folder, and get the singleton pattern that I have created there for the token "CategoriesRepository."
  categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  } // O private aqui já possibilita com que o execute já tenha acesso a variavel categoriesRepository


  async execute({
    name,
    description
  }) {
    // Como estou seguindo o Single Responsability Principle do SOLID, é necessário que está classe já tenha o seu propósito definido no nome, não tem o porque ter um método com um nome se não o nome execute. Manter este padrão.
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new _AppError.AppError("Category already exists!"); // Como meu Service nao tem e nem é bom ter acesso ao meu request e response, eu posso jogar um erro desta forma, ao invés da forma existente nas rotas.
    }

    this.categoriesRepository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class); // Estou exportando desta forma pois o visual code terá uma importação melhor.

exports.CreateCategoryUseCase = CreateCategoryUseCase;