"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car's Name",
      description: "Car's Description",
      daily_rate: 69,
      license_plate: "ABC-1234",
      fine_amount: 69,
      brand: "Brand",
      category_id: "Category"
    });
    expect(car).toHaveProperty("id");
  });
  it("Should not be able to create a car with a license plate that is already in use", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Car's Description",
      daily_rate: 69,
      license_plate: "ABC-1234",
      fine_amount: 69,
      brand: "Brand",
      category_id: "Cateegory"
    });
    await expect(createCarUseCase.execute({
      name: "Car 2",
      description: "Car's Description",
      daily_rate: 69,
      license_plate: "ABC-1234",
      fine_amount: 69,
      brand: "Brand",
      category_id: "Cateegory"
    })).rejects.toEqual(new _AppError.AppError("Car already exists"));
  });
  it("Should be able to create a car with available set as true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Car's Description",
      daily_rate: 69,
      license_plate: "ABCD-1234",
      fine_amount: 69,
      brand: "Brand",
      category_id: "Cateegory"
    });
    expect(car.available).toBe(true);
  });
});