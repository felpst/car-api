"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _EmailProviderInMemory = require("@shared/container/providers/EmailProvider/in-memory/EmailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgottenPasswordEmailUseCase = require("./SendForgottenPasswordEmailUseCase");

/*global spyOn*/
let sendForgottenPasswordEmailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let emailProvider;
describe("Send Forgot Email", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    emailProvider = new _EmailProviderInMemory.EmailProviderInMemory();
    sendForgottenPasswordEmailUseCase = new _SendForgottenPasswordEmailUseCase.SendForgottenPasswordEmailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, emailProvider);
  });
  it("should be able to send a recover password e-mail to the user", async () => {
    const sendEmail = jest.spyOn(emailProvider, "sendEmail"); //This function will be spying on a specific class, checking if something happened. I am using jest.spyON, because This method and many other jasmine methods were removed in jest 27.

    await usersRepositoryInMemory.create({
      driver_license: "792562",
      email: "vasbacnal@ukotigci.vu",
      name: "Oscar Strickland",
      password: "1234"
    });
    await sendForgottenPasswordEmailUseCase.execute("vasbacnal@ukotigci.vu");
    expect(sendEmail).toHaveBeenCalled();
  });
  it("should not be able to send a recover password e-mail to a nonexistent user", async () => {
    await expect(sendForgottenPasswordEmailUseCase.execute("batata@tabata.ta")).rejects.toEqual(new _AppError.AppError("User does not exist!"));
  });
  it("should be able to create an user's token", async () => {
    const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "089814",
      email: "cusreunu@wiepa.pa",
      name: "Isabelle Farmer",
      password: "1234"
    });
    await sendForgottenPasswordEmailUseCase.execute("cusreunu@wiepa.pa");
    expect(generateTokenEmail).toBeCalled();
  });
});