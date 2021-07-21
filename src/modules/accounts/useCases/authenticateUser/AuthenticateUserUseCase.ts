import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

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
} // I am creating this interface to avoid the return to contain the password.

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private UserRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise <IReponse> {
        // Checking if the user exists
        const user = await this.UserRepository.findByEmail(email);
        
        if(!user){
            throw new Error("Email or password incorrect!")
        }

        // Checking if the password given is correct
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email or password incorrect!")
        }

        // Gerar jsonwebtokne
        const token = sign({}, "2387913c84215ec7dd2e58c3953e9608", {
            subject: user.id,
            expiresIn: "1d"
        }) // Since this function doesn't return a promise, I don't need to use await. I can never pass the password inside the sign function, only noncritical information as the first parameter. The second parameter is the scret code that I can give to generate the sign (for this I will be using a md5 generated hash). The third parameter is a object that receives as its first item a subject that for this case will be the user's id, and also a expires in that will tell the program when the token will experie (for this I will be using 1 day).

        const tokenReturn: IReponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }