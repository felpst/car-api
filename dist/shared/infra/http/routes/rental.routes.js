"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("@modules/rentals/useCase/createRental/CreateRentalController");

var _DevolutionRentalController = require("@modules/rentals/useCase/devolutionRental/DevolutionRentalController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ListRentalsByUserController = require("@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUSerController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalsByUSerController.handle);