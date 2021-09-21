import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumRentalHours = 24;

        // Users shouldn't be able to open a new rental with a car that is already in a open rental.
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(car_id);

        if(carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        // A user cannot open two rentals.
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(user_id);

        if(rentalOpenToUser) {
            throw new AppError("There is a rental in progress to the user!");
        }

        // Rental should have a 24 hours minimum duration
        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date 
        );

        if(compare < minimumRentalHours) {
            throw new AppError("The rental return time is invalid");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase }