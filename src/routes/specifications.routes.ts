import { Router } from 'express';
import { createSpecicationController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
    return createSpecicationController.handle(req, res);
});

export { specificationsRoutes };