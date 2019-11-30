import {Router} from 'express';
import { UserRoutesController } from './User.routes.controller';
class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post('/login', UserRoutesController.logIn);
        this.router.post('/signup', UserRoutesController.signUp);
        this.router.get('/', UserRoutesController.getLoggedUser);
        this.router.post('/signout', UserRoutesController.signOut);
    }
}

export const userRoutes: Router =  new UserRoutes().router;