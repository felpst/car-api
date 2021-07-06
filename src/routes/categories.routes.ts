// O propósito de uma rota é somente de receber uma requisição, processa-la, e então retornar uma resposta.
import { Router } from 'express';
import multer from 'multer';

// import createCategoryController  from '../modules/cars/useCases/createCategory'; // Since I am exporting as default, I don't need to use the {}.
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController'; // Como aqui eu estou passando uma pasta, o sistema automaticamente já irá buscar pelo index.ts, portanto não preciso declarar isso explicitamente.

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp', // Aqui o multer irá pega o aqruivo que foi feito upload, e então vai mandar para a pasta tmp, para então outros processo acontecerem.
});

// const categories: Category[] = []; // Isto aqui é uma array de Category, que para este momento serve com uma tabela no banco de dados. Isto aqui foi movido para um repositório pois não cabe a rota ficar manipulando os dados.
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// categoriesRoutes.post("/", (req, res) => { // Para um API ser considerada uma API Rest, ela precisa ter o seu recurso muito bem definido
//     return createCategoryController().handle(req, res);
// });
categoriesRoutes.post("/", createCategoryController.handle); // Now the createCategoryController works as a middleware. This way the express can automatically pass the request and response to the middleware.

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/import",
    upload.single("file"), 
    importCategoryController.handle); // upload.single("file") funciona como um middleware que erá possibilitar somente o upload de um arquivo, e o "file" será o nome que será reconhecido pelo Insomnia.

export { categoriesRoutes };