// Os repositórios são responsáveis por fazerem a mainupalação dos dados (fazer select do db e etc).
import { Category } from "../model/Category";

// DTO --> Data Transfer Object: Criar um objeto que vai ser responsável em fazer a transferência de dados entre uma camada e outra.
interface ICreateCategoryDTO { // Este aqui é o meu DTO para fazer a transferência de dados entre o request do routes, e a minha classe. É bom começar com um I maiúsculo para indicar que é uma interface.
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[]; // Aqui foi definido como private, pois só quem tem acesso a isto aqui é o repositório.

    constructor() {
        this.categories = [];
    }

    create( { name, description }: ICreateCategoryDTO): void { // Aqui estou pegando o name e description do DTO, e também estou dizendo para o interpreter que esta função é um void, ou seja, não retornará nada, e portanto não precisa de um return.
        const category = new Category(); // Criando um novo objeto do tipo category, que através desta forma executa o constructor.
    
        Object.assign(category, { // Esta função do Object.assign() atribui ao object (neste caso category) os seguintes elementos.
            name,
            description,
            created_at: new Date(),
        })

        this.categories.push(category); // O this aqui indica que o comando se refere a private variable categories dentro da class.
    }

    list(): Category[] { // A função retornará uma array tipo category.
        return this.categories;
    }

    findByName(name: string): Category { 
        const category = this.categories.find(c => c.name === name)
        return category;
    }
}

export { CategoriesRepository }