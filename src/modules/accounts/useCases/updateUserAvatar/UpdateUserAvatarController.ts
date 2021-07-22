import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";



class UpdateUserAvatarController {

    async handle(request: Request, response: Response): Promise <Response> {
        const { id } = request.user;

        // Receive file
        const avatar_file = request.file.filename;

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({
            user_id: id,
            avatar_file
        })

        return response.status(204).send(); // 204 is when a change has been made, but there is nothing to be returned in the response's body.
    }
}

export { UpdateUserAvatarController };