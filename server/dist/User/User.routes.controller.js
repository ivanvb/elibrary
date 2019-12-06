"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const User_repository_1 = require("./User.repository");
const encrypt_1 = require("../Encryption/encrypt");
const auth_1 = require("../Auth/auth");
class UserRoutesController {
    static logIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield User_repository_1.UserRepository.findOne({ email, _id: null });
            if (user) {
                const passwordMatches = yield encrypt_1.Encryption.compareData(password, user._password);
                if (passwordMatches) {
                    req = auth_1.Auth.addAuthCookies(req, user);
                    const user_data = { _id: user.__id, name: user._name, email: user._email, admin: user._admin };
                    res.send({ data: user_data });
                }
                else {
                    res.sendStatus(401);
                }
            }
            else {
                res.sendStatus(401);
            }
        });
    }
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const user = new User_1.User(name, email, password);
            const saved = yield User_repository_1.UserRepository.save(user);
            auth_1.Auth.addAuthCookies(req, saved);
            res.send({ saved });
        });
    }
    static signOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                yield auth_1.Auth.logOut(req);
                res.sendStatus(200);
            }
            else {
                res.sendStatus(204);
            }
        });
    }
    static getLoggedUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                let user = yield User_repository_1.UserRepository.findOne({ _id: req.session.user._id, email: null });
                res.send({
                    _id: user.__id,
                    name: user._name,
                    email: user._email,
                    admin: user._admin
                });
            }
            else {
                res.sendStatus(401);
            }
        });
    }
}
exports.UserRoutesController = UserRoutesController;
