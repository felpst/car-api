import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository){ // O private aqui já possibilita com que o execute já tenha acesso a variavel categoriesRepository

    }

    execute({ name, description }: IRequest): void { // Como estou seguindo o Single Responsability Principle do SOLID, é necessário que está classe já tenha o seu propósito definido no nome, não tem o porque ter um método com um nome se não o nome execute. Manter este padrão.

        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new Error("Category already exists!"); // Como meu Service nao tem e nem é bom ter acesso ao meu request e response, eu posso jogar um erro desta forma, ao invés da forma existente nas rotas.
        }
    
        this.categoriesRepository.create({name, description})
    }
}

export { CreateCategoryUseCase } // Estou exportando desta forma pois o visual code terá uma importação melhor.