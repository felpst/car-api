import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecicationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecicationController = new CreateSpecicationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecicationController.handle);

export { specificationsRoutes };