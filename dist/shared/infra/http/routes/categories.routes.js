"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("@modules/cars/useCases/createCategory/CreateCategoryController");

var _ImportCategoryController = require("@modules/cars/useCases/importCategory/ImportCategoryController");

var _ListCategoriesController = require("@modules/cars/useCases/listCategories/ListCategoriesController");

var _ensureAdmin = require("@shared/infra/http/middlewares/ensureAdmin");

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// O propósito de uma rota é somente de receber uma requisição, processa-la, e então retornar uma resposta.
// import createCategoryController  from '../modules/cars/useCases/createCategory'; // Since I am exporting as default, I don't need to use the {}.
// Como aqui eu estou passando uma pasta, o sistema automaticamente já irá buscar pelo index.ts, portanto não preciso declarar isso explicitamente.
const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, _multer.default)({
  dest: './tmp' // Aqui o multer irá pega o aqruivo que foi feito upload, e então vai mandar para a pasta tmp, para então outros processo acontecerem.

}); // const categories: Category[] = []; // Isto aqui é uma array de Category, que para este momento serve com uma tabela no banco de dados. Isto aqui foi movido para um repositório pois não cabe a rota ficar manipulando os dados.

const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const listCategoriesController = new _ListCategoriesController.ListCategoriesController(); // categoriesRoutes.post("/", (req, res) => { // Para um API ser considerada uma API Rest, ela precisa ter o seu recurso muito bem definido
//     return createCategoryController().handle(req, res);
// });

categoriesRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle); // Now the createCategoryController works as a middleware. This way the express can automatically pass the request and response to the middleware.

categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.single("file"), importCategoryController.handle); // upload.single("file") funciona como um middleware que erá possibilitar somente o upload de um arquivo, e o "file" será o nome que será reconhecido pelo Insomnia.