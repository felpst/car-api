import { Category } from "../entities/Category";

// DTO --> Data Transfer Object: Criar um objeto que vai ser responsável em fazer a transferência de dados entre uma camada e outra.
interface ICreateCategoryDTO { // Este aqui é o meu DTO para fazer a transferência de dados entre o request do routes e a minha classe. É bom começar com um I maiúsculo para indicar que é uma interface.
    name: string;
    description: string;
}

interface ICategoriesRepository { // Interface is a structure that defines the contract in your application. It defines the syntax for classes to follow.
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };