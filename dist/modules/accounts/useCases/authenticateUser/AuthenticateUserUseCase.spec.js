"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });

  async function createUser() {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    return user;
  }

  it("Should be able to authenticate an user", async () => {
    const user = await createUser();
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("Should not be able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
  it("Should not be able to authenticate an user with incorrect password", async () => {
    const user = await createUser();
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "IncorrectPassword"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
});