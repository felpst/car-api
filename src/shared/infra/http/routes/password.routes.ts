import { Router } from "express";

import { SendForgottenPasswordEmailController } from "@modules/accounts/useCases/sendForgottenPasswordEmail/SendForgottenPasswordEmailController";
import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";

const passwordRoutes = Router();

const sendForgottenPasswordEmailController = new SendForgottenPasswordEmailController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgottenPasswordEmailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes }