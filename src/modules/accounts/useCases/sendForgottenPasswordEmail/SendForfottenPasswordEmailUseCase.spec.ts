/*global spyOn*/
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { EmailProviderInMemory } from "@shared/container/providers/EmailProvider/in-memory/EmailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgottenPasswordEmailUseCase } from "./SendForgottenPasswordEmailUseCase"

let sendForgottenPasswordEmailUseCase: SendForgottenPasswordEmailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let emailProvider: EmailProviderInMemory;

describe("Send Forgot Email", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        emailProvider = new EmailProviderInMemory();

        sendForgottenPasswordEmailUseCase = new SendForgottenPasswordEmailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            emailProvider,
        );
    });

    it("should be able to send a recover password e-mail to the user", async () => {
        const sendEmail = jest.spyOn(emailProvider, "sendEmail"); //This function will be spying on a specific class, checking if something happened. I am using jest.spyON, because This method and many other jasmine methods were removed in jest 27.

        await usersRepositoryInMemory.create({
            driver_license: "792562",
            email: "vasbacnal@ukotigci.vu",
            name: "Oscar Strickland",
            password: "1234",
        });

        await sendForgottenPasswordEmailUseCase.execute("vasbacnal@ukotigci.vu");

        expect(sendEmail).toHaveBeenCalled();
    });

    it("should not be able to send a recover password e-mail to a nonexistent user", async () => {
        await expect(
            sendForgottenPasswordEmailUseCase.execute("batata@tabata.ta")
        ).rejects.toEqual(new AppError("User does not exist!"));
    });

    it("should be able to create an user's token", async () => {
        const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "089814",
            email: "cusreunu@wiepa.pa",
            name: "Isabelle Farmer",
            password: "1234",
        });

        await sendForgottenPasswordEmailUseCase.execute("cusreunu@wiepa.pa");

        expect(generateTokenEmail).toBeCalled();

    })
})