import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" "); // Since i don't need the first item of the authHeader, I will get the second by using [, secondItem]

    try {
        const { sub: user_id } = verify(token, "2387913c84215ec7dd2e58c3953e9608") as IPayload; // The second parameter is the secret key that I have created for the AuthenticateUserUseCase. Using as IPayload is forcing the verify to return a sub.
        const userRepository = new UsersRepository();
        const user = await userRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exist!", 401);
        }

        request.user = {
            id: user_id,
        }

        next();
    } catch {
        throw new AppError("Invalid Token!", 401);
    }
}