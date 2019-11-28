import { Request, Response, NextFunction } from 'express';

export class UserRoutesController {

    public static async logIn(req: Request, res: Response, next: NextFunction){
        res.send("Logged in")
    }
}