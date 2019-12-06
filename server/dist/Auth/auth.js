"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
    static addAuthCookies(req, user) {
        req.session.user = {
            admin: user._admin,
            _id: user.__id
        };
        return req;
    }
    static isAdmin(req) {
        return !!req.session.user.admin;
    }
    static isAuthenticated(req) {
        return !!req.session.user && !!req.session.user._id;
    }
    static logOut(req) {
        return new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                resolve(true);
            });
        });
    }
}
exports.Auth = Auth;
