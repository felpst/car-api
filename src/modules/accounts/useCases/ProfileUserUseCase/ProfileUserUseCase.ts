import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ProfileUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}


    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        return user;
    }

}

export { ProfileUserUseCase };