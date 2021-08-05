import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

// ICategoryRepository. I am creating a automatical singleton using the tsyringe 
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", // This is the name I am going to use to call the following module.
    CategoriesRepository // This is the module being called.
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository", // This is the name I am going to use to call the following module.
    SpecificationsRepository // This is the module being called.
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository", // This is the name I am going to use to call the following module.
    UsersRepository // This is the module being called.
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository", // This is the name I am going to use to call the following module.
    CarsRepository // This is the module being called.
);