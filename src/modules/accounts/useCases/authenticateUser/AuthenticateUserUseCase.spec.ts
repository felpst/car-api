import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory
        );
    });

    async function createUser(): Promise<ICreateUserDTO> {
        const user: ICreateUserDTO = {
          driver_license: "000123",
          email: "user@test.com",
          password: "1234",
          name: "User Test",
        };
    
        await createUserUseCase.execute(user);
        return user;
    }
    
    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = await createUser();

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

})