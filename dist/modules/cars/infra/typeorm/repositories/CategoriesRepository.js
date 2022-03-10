"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

// Os repositórios são responsáveis por fazerem a mainupalação dos dados (fazer select do db e etc).
// Singleton Pattern --> Criar apenas uma instância de uma classe 
class CategoriesRepository {
  // The class which uses the implments keywords, will need to implement all the properties and methods of the class which it implements.
  // private categories: Category[]; // Aqui foi definido como private, pois só quem tem acesso a isto aqui é o repositório.
  constructor() {
    this.repository = void 0;
    // O construtor foi declarado como private para que eu possa aplicar o singleton pattern aqui, ou seja, somente a classe vai poder instanciar um novo objeto dela mesmo.
    this.repository = (0, _typeorm.getRepository)(_Category.Category); // This way I will have access to the atributes I have on repository, but only with the methiods I have inside of this class.
  } // public static getInstance(): CategoriesRepository { // Esta aqui vai ser a função que vai ou criar uma nova instância caso nenhuma exista, ou retornar a já existente.
  //     if (!CategoriesRepository.INSTANCE) {
  //         CategoriesRepository.INSTANCE = new CategoriesRepository();
  //     }
  //     return CategoriesRepository.INSTANCE;
  // }


  async create({
    name,
    description
  }) {
    // Aqui estou pegando o name e description do DTO, e também estou dizendo para o interpreter que esta função é um void, ou seja, não retornará nada, e portanto não precisa de um return.
    // const category = new Category(); // Criando um novo objeto do tipo category, que através desta forma executa o constructor.
    // Object.assign(category, { // Esta função do Object.assign() atribui ao object (neste caso category) os seguintes elementos.
    //     name,
    //     description,
    //     created_at: new Date(),
    // })
    // this.categories.push(category); // O this aqui indica que o comando se refere a private variable categories dentro da class.
    const category = this.repository.create({
      description,
      name
    }); // My entity will be the one creating this category, since it deals with the database.

    await this.repository.save(category);
  }

  async list() {
    // A função retornará uma array tipo category.
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name) {
    // Select * from categories where name = "name" limit 1
    const category = await this.repository.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;