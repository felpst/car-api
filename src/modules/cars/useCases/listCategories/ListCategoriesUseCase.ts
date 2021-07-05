import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"


class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository){ // O private aqui já possibilita com que o execute já tenha acesso a variavel categoriesRepository

    }

    execute(): Category[] { // Como estou seguindo o Single Responsability Principle do SOLID, e está classe já tenha o seu propósito definido no nome, não tem o porque ter um méstodo com um nome se não o nome exectue. Manter este padrão.
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };