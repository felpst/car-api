import { Router } from 'express';
import { CreateSpecicationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecicationController = new CreateSpecicationController();

specificationsRoutes.post("/", createSpecicationController.handle);

export { specificationsRoutes };