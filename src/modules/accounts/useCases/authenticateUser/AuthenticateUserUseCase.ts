import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IReponse {
    user: {
        name: string;
        email: string;
    }
    token: string;
    refresh_token: string;
} // I am creating this interface to avoid the return to contain the password.

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private UserRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {}

    async execute({ email, password }: IRequest): Promise <IReponse> {
        // Checking if the user exists
        const user = await this.UserRepository.findByEmail(email);
        const {
            secret_refresh_token, 
            secret_token, 
            expires_in_token, 
            expires_in_refresh_token, 
            expires_refresh_token_days 
         } = auth;
        
        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        // Checking if the password given is correct
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        // Gerar jsonwebtokne
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        }) // Since this function doesn't return a promise, I don't need to use await. I can never pass the password inside the sign function, only noncritical information as the first parameter. The second parameter is the scret code that I can give to generate the sign (for this I will be using a md5 generated hash). The third parameter is a object that receives as its first item a subject that for this case will be the user's id, and also a expires in that will tell the program when the token will experie (for this I will be using 1 day).

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        const tokenReturn: IReponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token,
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }