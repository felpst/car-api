import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { CreateSpecicationController } from "./CreateSpecificationController";



const specificationsRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);

const createSpecicationController = new CreateSpecicationController(createSpecificationUseCase);

export { createSpecicationController };