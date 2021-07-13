import { ICreateUserDTO } from "../dtos/ICreateUserDTO";


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>; // Since ICreateUserDTO has many parameters, I will be not destructuring it.
}

export { IUsersRepository };