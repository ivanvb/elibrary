"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
class User {
    constructor(name, email, password, admin, _id) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = (admin ? admin : false);
    }
    set _name(name) {
        this.name = name;
    }
    set _email(email) {
        this.email = email;
    }
    set _password(password) {
        this.password = password;
    }
    get __id() {
        return this._id;
    }
    get _name() {
        return this.name;
    }
    get _email() {
        return this.email;
    }
    get _password() {
        return this.password;
    }
    get _admin() {
        return this.admin;
    }
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
exports.User = User;
exports.UserModel = typegoose_1.getModelForClass(User);
