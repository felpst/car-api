// Os repositórios são responsáveis por fazerem a mainupalação dos dados (fazer select do db e etc).
import { getRepository, Repository } from "typeorm";

import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

// Singleton Pattern --> Criar apenas uma instância de uma classe 

class CategoriesRepository 
    implements ICategoriesRepository { // The class which uses the implments keywords, will need to implement all the properties and methods of the class which it implements.
    // private categories: Category[]; // Aqui foi definido como private, pois só quem tem acesso a isto aqui é o repositório.
    private repository: Repository<Category>;

    constructor() { // O construtor foi declarado como private para que eu possa aplicar o singleton pattern aqui, ou seja, somente a classe vai poder instanciar um novo objeto dela mesmo.
        this.repository = getRepository(Category); // This way I will have access to the atributes I have on repository, but only with the methiods I have inside of this class.
    }

    // public static getInstance(): CategoriesRepository { // Esta aqui vai ser a função que vai ou criar uma nova instância caso nenhuma exista, ou retornar a já existente.
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }

    async create( { name, description }: ICreateCategoryDTO): Promise<void> { // Aqui estou pegando o name e description do DTO, e também estou dizendo para o interpreter que esta função é um void, ou seja, não retornará nada, e portanto não precisa de um return.
        // const category = new Category(); // Criando um novo objeto do tipo category, que através desta forma executa o constructor.
    
        // Object.assign(category, { // Esta função do Object.assign() atribui ao object (neste caso category) os seguintes elementos.
        //     name,
        //     description,
        //     created_at: new Date(),
        // })

        // this.categories.push(category); // O this aqui indica que o comando se refere a private variable categories dentro da class.
        const category = this.repository.create({
            description,
            name,
        }); // My entity will be the one creating this category, since it deals with the database.

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> { // A função retornará uma array tipo category.
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> { 
        // Select * from categories where name = "name" limit 1
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository }