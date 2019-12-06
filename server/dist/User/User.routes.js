"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_routes_controller_1 = require("./User.routes.controller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', User_routes_controller_1.UserRoutesController.logIn);
        this.router.post('/signup', User_routes_controller_1.UserRoutesController.signUp);
        this.router.get('/', User_routes_controller_1.UserRoutesController.getLoggedUser);
        this.router.post('/signout', User_routes_controller_1.UserRoutesController.signOut);
    }
}
exports.userRoutes = new UserRoutes().router;
