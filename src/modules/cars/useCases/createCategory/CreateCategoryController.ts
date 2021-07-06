import {Request, Response} from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    // constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase); // This, throught the use of the tsyringe, will conduct the injection of the dependecies I specified automatically.
    
        await createCategoryUseCase.execute({name, description});
    
        return response.status(201).send();
    }
}

export { CreateCategoryController };