import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){} // O private aqui já possibilita com que o execute já tenha acesso a variavel categoriesRepository

    async execute(): Promise<Category[]> { // Como estou seguindo o Single Responsability Principle do SOLID, e está classe já tenha o seu propósito definido no nome, não tem o porque ter um méstodo com um nome se não o nome exectue. Manter este padrão.
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };