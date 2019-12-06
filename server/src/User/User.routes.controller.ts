import { Request, Response, NextFunction } from 'express';
import { User } from './User';
import { UserRepository } from './User.repository';
import { Encryption } from '../Encryption/encrypt';
import { Auth } from '../Auth/auth';

export class UserRoutesController {

    public static async logIn(req: Request, res: Response, next: NextFunction){
        const {email, password} =  req.body;
        const user: User = await UserRepository.findOne({email, _id: null});
        if(user){
            const passwordMatches = await Encryption.compareData(password, user._password);

            if(passwordMatches){
                req = Auth.addAuthCookies(req, user);
                const user_data = {name: user._name, email: user._email, admin: user._admin};
                res.send({data: user_data})
            } else {
                res.sendStatus(401);
            }
        }
    }

    public static async signUp(req: Request, res: Response, next: NextFunction){
        const {name, email, password} = req.body;
        const user: User = new User(name, email, password);
        const saved = await UserRepository.save(user);

        Auth.addAuthCookies(req, saved);
        res.send({saved});
    }

    public static async signOut(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            await Auth.logOut(req);
            res.sendStatus(200);
        }
    }

    public static async getLoggedUser(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            console.log(req.session);
            let user: User = await UserRepository.findOne({_id: req.session.user._id, email: null});
            console.log(user);
            res.send({name: user._name, email: user._email, admin: user._admin});
        } else {
            res.sendStatus(401);
        }
    }
}