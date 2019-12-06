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
                const user_data = {_id: user.__id, name: user._name, email: user._email, admin: user._admin};
                res.send({data: user_data})
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }

    public static async signUp(req: Request, res: Response, next: NextFunction){
        const {name, email, password} = req.body;
        let isRegistered = await UserRepository.findOne({email: <string>email, _id: null});

        if(name && email && password && !isRegistered){
            const user: User = new User(name, email, password);
            const saved = await UserRepository.save(user);
    
            Auth.addAuthCookies(req, saved);
            res.send({saved});
        } else {
            res.sendStatus(400);
        }
        
    }

    public static async signOut(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            await Auth.logOut(req);
            res.sendStatus(200);
        } else {
            res.sendStatus(204)
        }
    }

    public static async getLoggedUser(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            let user: User = await UserRepository.findOne({_id: req.session.user._id, email: null});
            res.send({
                _id: user.__id,
                name: user._name,
                email: user._email,
                admin: user._admin});
        } else {
            res.sendStatus(401);
        }
    }
}