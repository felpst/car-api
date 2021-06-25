import { Router } from 'express'

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use("/categories", categoriesRoutes) // Toda a rota que vier do categoriesRoutes será iniciada com o /categories, portanto eu não preciso mais ficar incluindo isso nos documentos de rotas.
router.use("/specifications", specificationsRoutes);

export { router };