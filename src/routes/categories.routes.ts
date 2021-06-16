// O propósito de uma rota é somente de receber uma requisição, processa-la, e então retornar uma resposta.

import { Router } from 'express';
import multer from 'multer';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories'; // Como aqui eu estou passando uma pasta, o sistema automaticamente já irá buscar pelo index.ts, portanto não preciso declarar isso explicitamente.

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp', // Aqui o multer irá pega o aqruivo que foi feito upload, e então vai mandar para a pasta tmp, para então outros processo acontecerem.
});

// const categories: Category[] = []; // Isto aqui é uma array de Category, que para este momento serve com uma tabela no banco de dados. Isto aqui foi movido para um repositório pois não cabe a rota ficar manipulando os dados.

categoriesRoutes.post("/", (req, res) => { // Para um API ser considerada uma API Rest, ela precisa ter o seu recurso muito bem definido
    return createCategoryController.handle(req, res);
})

categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importCategoryController.handle(req, res);
}) // upload.single("file") funciona como um middleware que erá possibilitar somente o upload de um arquivo, e o "file" será o nome que será reconhecido pelo Insomnia.

export { categoriesRoutes };