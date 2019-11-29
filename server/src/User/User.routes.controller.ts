import { Request, Response, NextFunction } from 'express';
import { User } from './User';
import { UserRepository } from './User.repository';
import { Encryption } from '../Encryption/encrypt';

export class UserRoutesController {

    public static async logIn(req: Request, res: Response, next: NextFunction){
        const {email, password} =  req.body;
        const user: User = await UserRepository.findOne({email, _id: null});
        const passwordMatches = await Encryption.compareData(password, user._password);

        if(passwordMatches){
            const user_data = {name: user._name, email: user._email, admin: user._admin};
            res.send({data: user_data})
        } else {
            res.sendStatus(401);
        }

    }

    public static async signUp(req: Request, res: Response, next: NextFunction){
        const {name, email, password} = req.body;
        const user: User = new User(name, email, password);
        const saved = await UserRepository.save(user);

        res.send({saved});
    }
}