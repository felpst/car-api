import { Router } from 'express';

import { CreateSpecicationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecicationController = new CreateSpecicationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecicationController.handle);

export { specificationsRoutes };