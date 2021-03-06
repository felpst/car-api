import { Router } from 'express'

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { userRoutes } from './users.routes';
import { carsRoutes } from './cars.routes';
import { authenticateRoutes } from './authenticate.routes';
import { rentalRoutes } from './rental.routes';
import { passwordRoutes } from './password.routes';

const router = Router();

router.use("/categories", categoriesRoutes) // Toda a rota que vier do categoriesRoutes será iniciada com o /categories, portanto eu não preciso mais ficar incluindo isso nos documentos de rotas.
router.use("/specifications", specificationsRoutes);
router.use("/users", userRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes); // This allows the user to pass that using just "/" wihtout any command after.

export { router };