// Este aqui é um exemplo de um contrato que implementa o padrão imposto pelo ICategoryRepository. Fazendo isso eu posso utilizar tatno este arquivo (um exemplo para postgress) como o já funcional CategoriesRepository, para poder fazer a operação como repositório.

import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        console.log(name);
        return null;
    }
    list(): Category[] {
        return null;
    }
    create({ name, description }: ICreateCategoryDTO): void {
        console.log(name, description);
    }

}

export { PostgresCategoriesRepository };