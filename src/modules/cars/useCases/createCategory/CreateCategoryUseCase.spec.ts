import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    }) // before each test, execute the following function

    it("Should be able to create a new category", async () => {

        const category = {
            name: "Category Test",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");

    }) // it() will always be used to create a test, therefore all test must be inside an it.

    it("Should not be able to create a new category with name already in use", async () => {

        const category = {
            name: "Category Test",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        await expect(createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
        ).rejects.toEqual(new AppError("Category already exists!"));

    })

}) // descibe() is used to group all the tests together.