import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCase/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCase/devolutionRental/DevolutionRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListRentalsByUserController } from '@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUSerController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUSerController.handle);

export { rentalRoutes }