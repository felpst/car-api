import { classToClass } from "class-transformer"; // classToClass is a function that transform a class to a class, allowing for the manipulation of the class that I am getting from the mapper.
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {

    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url,
    }: User): IUserResponseDTO {  // static method allows me to call it without instantiating the class
        const user = classToClass({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        })
        return user;
    }
}

export{ UserMap };