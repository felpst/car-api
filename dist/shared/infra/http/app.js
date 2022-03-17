"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

require("../../container");

var _AppError = require("../../errors/AppError");

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _routes = require("./routes");

var _upload = _interopRequireDefault(require("../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Swagger é um library externa que eu instalei (junto com @types) que testa o projeto e já cria uma API documentation.
// I am importing the container index that I have used to create a category. Why did i have import it here?
// Since I am importing the index from the database folder, I don't need to explicitly pass it, because it automatically recognizes it.
// File que conterá a documentation.
(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default)); // A documentação vai ficar na URL /api-docs. O setup() necessita de um arquivo JSON para armazenar todas as informações sobre a documentação.

app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`)); // Serve para acessar os arquivos estáticos.

app.use("/cars", _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use(_routes.router); // Aqui eu estou usando o index.ts das Routes para importar e usar todas de uma só vez.

app.use((err, request, response, next) => {
  // I am creating a middleware here to deal with errors. For middlewares that deal with errors, the first argument must always be the error.
  if (err instanceof _AppError.AppError) // Here i am getting the instance of the error
    {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
}); // Estou usando uma bibliotéca chamada de multer para poder possibilitar o upload de arquivos para este projeto.
// Para usar uma bibliotéca é necessário primeiro instalar ela (yarn add 'Nome da Blib."), e então instalar os types dela (yarn add @types/'Nome da Blib.' -D), o -D possibilita a instalação somente em modo de desenvolvedor.