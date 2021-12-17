import { Router } from "express";

import { SendForgottenPasswordEmailController } from "@modules/accounts/useCases/sendForgottenPasswordEmail/SendForgottenPasswordEmailController";

const passwordRoutes = Router();

const sendForgottenPasswordEmailController = new SendForgottenPasswordEmailController();

passwordRoutes.post("/forgot", sendForgottenPasswordEmailController.handle);

export { passwordRoutes }