import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>; // Since ICreateUserDTO has many parameters, I will be not destructuring it.
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };