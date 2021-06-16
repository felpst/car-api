import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CreateCategoryController } from './CreateCategoryController';

const categoriesRepository = new CategoriesRepository.getInstance(); // Singleton pattern applied.

const createCategoryUseCase = new CreateCategoryUseCase( categoriesRepository );

const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
);

export { createCategoryController };