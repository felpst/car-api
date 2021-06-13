// O propósito de uma rota é somente de receber uma requisição, processa-la, e então retornar uma resposta.

import { Router } from 'express';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// const categories: Category[] = []; // Isto aqui é uma array de Category, que para este momento serve com uma tabela no banco de dados. Isto aqui foi movido para um repositório pois não cabe a rota ficar manipulando os dados.

categoriesRoutes.post("/", (req, res) => { // Para um API ser considerada uma API Rest, ela precisa ter o seu recurso muito bem definido
    const { name, description } = req.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({name, description});

    return res.status(201).send();
})

categoriesRoutes.get("/", (req, res) => {
    const all = categoriesRepository.list();
    return res.json(all);
})

export { categoriesRoutes };