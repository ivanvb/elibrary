import { Request, Response, NextFunction } from 'express';
import { User } from './User';
import { UserRepository } from './User.repository';

export class UserRoutesController {

    public static async logIn(req: Request, res: Response, next: NextFunction){
        const {name, email, password} =  req.body;
        const user: User = new User(name, email, password);
        const saved = await UserRepository.save(user);

        res.send({saved});
    }
}