import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


interface IRequest {
    name: string;
    description: string;
}

@injectable() // This will allow the following class to be injectable.
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository") // This will create a command for the program to conduct a search in my conatiner folder, and get the singleton pattern that I have created there for the token "CategoriesRepository."
        private categoriesRepository: ICategoriesRepository
    ){} // O private aqui já possibilita com que o execute já tenha acesso a variavel categoriesRepository

    async execute({ name, description }: IRequest): Promise<void> { // Como estou seguindo o Single Responsability Principle do SOLID, é necessário que está classe já tenha o seu propósito definido no nome, não tem o porque ter um método com um nome se não o nome execute. Manter este padrão.

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new AppError("Category already exists!"); // Como meu Service nao tem e nem é bom ter acesso ao meu request e response, eu posso jogar um erro desta forma, ao invés da forma existente nas rotas.
        }
    
        this.categoriesRepository.create({name, description})
    }
}

export { CreateCategoryUseCase } // Estou exportando desta forma pois o visual code terá uma importação melhor.