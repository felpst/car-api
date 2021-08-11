import { CarsRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRespositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRespositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test Car",
	        description: "Car Description",
	        daily_rate: 100.00,
	        license_plate: "TST-1234",
	        fine_amount: 50.00,
	        brand: "Car_brand",
	        category_id: "category_id",
        })

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test Car2",
	        description: "Car Description",
	        daily_rate: 100.00,
	        license_plate: "TST-1234",
	        fine_amount: 50.00,
	        brand: "Car_brand_test",
	        category_id: "category_id",
        })

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);

    });
});