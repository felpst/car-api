"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryUseCase = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _csvParse = _interopRequireDefault(require("csv-parse"));

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file) {
    // Como estou trabalhando com pomise, eu preciso definir que vai ser uma promise do tipo IImportCategory.
    return new Promise((resolve, reject) => {
      const stream = _fs.default.createReadStream(file.path); // Esta função permite com que eu leia o arquivo em partes (chuncks). O file.path da a ele o path do meu arquivo.


      const categories = [];
      const parseFile = (0, _csvParse.default)();
      stream.pipe(parseFile); // O pega o que está sendo lido pelo stream, e joga para onde for determinado.

      parseFile.on("data", async line => {
        // Esta função passs a linha como ["name", "description"]
        const [name, description] = line; // Colocando agr a linha dentro da categories

        categories.push({
          name,
          description
        });
      }).on("end", () => {
        // Quando finalizar o parse do meu arquivo eu quero que você coloque na minha promise o categories.
        _fs.default.promises.unlink(file.path); // Isto irá fazer a remoção dos arquivos.


        resolve(categories);
      }).on("error", err => {
        // Caso tenho um erro, ele vai pegar e passar para o reject o error.
        reject(err);
      });
    });
  }

  async execute(file) {
    // Como não sei o tipo do file, eu posso colocar como any. Eu descobri o tipo do arquivo info em routes deixando o mouse sobre o file.
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const {
        name,
        description
      } = category;
      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }

}) || _class) || _class) || _class) || _class); // Estou instalando uma bibliotéca que permite com que eu manipule mais facilmente arquivos csv chamada de csv-parse.

exports.ImportCategoryUseCase = ImportCategoryUseCase;