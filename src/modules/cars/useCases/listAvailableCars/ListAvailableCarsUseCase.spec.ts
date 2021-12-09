import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by brand", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test Car2",
	        description: "Car Description",
	        daily_rate: 100.00,
	        license_plate: "TST-1234",
	        fine_amount: 50.00,
	        brand: "Car_brand_test",
	        category_id: "category_id",
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test Car3",
	        description: "Car Description",
	        daily_rate: 100.00,
	        license_plate: "TST-12345",
	        fine_amount: 50.00,
	        brand: "Car_brand_test",
	        category_id: "category_id",
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "Test Car3",
        });

        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by category", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Test Car4",
	        description: "Car Description",
	        daily_rate: 100.00,
	        license_plate: "TST-23456",
	        fine_amount: 50.00,
	        brand: "Car_brand_test",
	        category_id: "category_id_test",
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id_test",
        });

        expect(cars).toEqual([car]);

    });
});