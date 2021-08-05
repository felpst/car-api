import { CarsRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRespositoryInMemory: CarsRespositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRespositoryInMemory = new CarsRespositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRespositoryInMemory);
    })

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car's Name",
            description: "Car's Description",
            daily_rate: 69,
            license_plate: "ABC-1234",
            fine_amount: 69,
            brand: "Brand",
            category_id: "Cateegory",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with a license plate that is already in use", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car 1",
                description: "Car's Description",
                daily_rate: 69,
                license_plate: "ABC-1234",
                fine_amount: 69,
                brand: "Brand",
                category_id: "Cateegory",
            });
    
            await createCarUseCase.execute({
                name: "Car 2",
                description: "Car's Description",
                daily_rate: 69,
                license_plate: "ABC-1234",
                fine_amount: 69,
                brand: "Brand",
                category_id: "Cateegory",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a car with available set as true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Car's Description",
            daily_rate: 69,
            license_plate: "ABCD-1234",
            fine_amount: 69,
            brand: "Brand",
            category_id: "Cateegory",
        });

        expect(car.available).toBe(true);
    });
})