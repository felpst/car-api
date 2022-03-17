"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CarsImagesRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImagesRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

// ICategoryRepository. I am creating a automatical singleton using the tsyringe 
_tsyringe.container.registerSingleton("CategoriesRepository", // This is the name I am going to use to call the following module.
_CategoriesRepository.CategoriesRepository // This is the module being called.
);

_tsyringe.container.registerSingleton("SpecificationsRepository", // This is the name I am going to use to call the following module.
_SpecificationsRepository.SpecificationsRepository // This is the module being called.
);

_tsyringe.container.registerSingleton("UsersRepository", // This is the name I am going to use to call the following module.
_UsersRepository.UsersRepository // This is the module being called.
);

_tsyringe.container.registerSingleton("CarsRepository", // This is the name I am going to use to call the following module.
_CarsRepository.CarsRepository // This is the module being called.
);

_tsyringe.container.registerSingleton("CarsImagesRepository", // This is the name I am going to use to call the following module.
_CarsImagesRepository.CarsImagesRepository // This is the module being called.
);

_tsyringe.container.registerSingleton("RentalsRepository", // This is the name I am going to use to call the following module.
_RentalsRepository.RentalsRepository // This is the module being called.
);

_tsyringe.container.registerSingleton("UsersTokensRepository", // This is the name I am going to use to call the following module.
_UsersTokensRepository.UsersTokensRepository // This is the module being called.
);