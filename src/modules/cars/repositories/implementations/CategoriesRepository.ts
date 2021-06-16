// Os repositórios são responsáveis por fazerem a mainupalação dos dados (fazer select do db e etc).
import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

// Singleton Pattern --> Criar apenas uma instância de uma classe 

class CategoriesRepository implements ICategoriesRepository{ // The class which uses the implments keywords, will need to implement all the properties and methods of the class which it implements.
    private categories: Category[]; // Aqui foi definido como private, pois só quem tem acesso a isto aqui é o repositório.

    private static INSTANCE: CategoriesRepository;

    private constructor() { // O construtor foi declarado como private para que eu possa aplicar o singleton pattern aqui, ou seja, somente a classe vai poder instanciar um novo objeto dela mesmo.
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository { // Esta aqui vai ser a função que vai ou criar uma nova instância caso nenhuma exista, ou retornar a já existente.
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
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