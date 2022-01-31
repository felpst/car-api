import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";


import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider
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
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user", async () => {
        await expect(authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("Should not be able to authenticate an user with incorrect password", async () => {
        const user: ICreateUserDTO = await createUser();

        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "IncorrectPassword",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

})