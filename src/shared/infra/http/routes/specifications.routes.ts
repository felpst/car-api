import { Router } from 'express';

import { CreateSpecicationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecicationController = new CreateSpecicationController();


specificationsRoutes.post(
    "/", 
    ensureAuthenticated,
    ensureAdmin,
    createSpecicationController.handle
);

export { specificationsRoutes };