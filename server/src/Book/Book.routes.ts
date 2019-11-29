import {Router} from 'express';
import { BookRoutesController } from './Book.routes.controller';

class BookRoutes{
    public router: Router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post('/', BookRoutesController.addBook);
    }
}

export const bookRoutes: Router =  new BookRoutes().router;