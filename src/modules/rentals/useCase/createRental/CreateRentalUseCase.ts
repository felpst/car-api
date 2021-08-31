import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // This is a global date format

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
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
        const expectedReturnDateFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();
        
        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

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