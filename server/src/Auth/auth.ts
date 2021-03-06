import {Request} from 'express';
import {User} from '../User/User';

export class Auth{

    public static addAuthCookies(req: Request, user: User): Request{
        req.session.user = {
            admin: user._admin,
            _id: user.__id
        }

        return req;
    }

    public static isAdmin(req: Request): boolean{
        return !!req.session.user.admin
    }

    public static isAuthenticated(req: Request): boolean{
        return !!req.session.user && !!req.session.user._id
    }

    public static logOut(req: Request): Promise<boolean>{
        return new Promise((resolve, reject)=>{
            req.session.destroy((err)=>{
                resolve(true);
            });
        })
    }
}