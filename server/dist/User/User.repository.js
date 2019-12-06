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
const encrypt_1 = require("../Encryption/encrypt");
class UserRepository {
    static save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user._password = yield encrypt_1.Encryption.hashPassword(user._password);
            const savedUser = yield User_1.UserModel.create(user);
            return savedUser;
        });
    }
    static findOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, _id } = opts;
            let found;
            if (_id) {
                found = yield User_1.UserModel.findOne({ _id });
            }
            else {
                found = yield User_1.UserModel.findOne({ email });
            }
            return found;
        });
    }
}
exports.UserRepository = UserRepository;
