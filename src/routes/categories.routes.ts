import { Router } from 'express';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/categories", (req, res) => { // Para um API ser considerada uma API Rest, ela precisa ter o seu recurso muito bem definido
    const { name, description } = req.body;
    
    categories.push({
        name,
        description
    });

    return res.status(201).send();
})

export { categoriesRoutes };