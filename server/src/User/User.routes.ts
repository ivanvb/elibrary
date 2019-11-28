import {Router} from 'express';
import { UserRoutesController } from './User.routes.controller';
class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post('/login', UserRoutesController.logIn);
    }
}

export const userRoutes: Router =  new UserRoutes().router;