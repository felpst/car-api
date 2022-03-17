"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CategoriesRepositoryInMemory = require("../../repositories/in-memory/CategoriesRepositoryInMemory");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  }); // before each test, execute the following function

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty("id");
  }); // it() will always be used to create a test, therefore all test must be inside an it.

  it("Should not be able to create a new category with name already in use", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError("Category already exists!"));
  });
}); // descibe() is used to group all the tests together.