import {Router} from 'express';
import { BookRoutesController } from './Book.routes.controller';

class BookRoutes{
    public router: Router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post('/', BookRoutesController.addBook);
        this.router.get('/:book_id', BookRoutesController.getSingleBook);
        this.router.get('/text/:book_id', BookRoutesController.getBookText);
        this.router.get('/audio/:book_id', BookRoutesController.getBookAudio);
        this.router.delete('/:book_id', BookRoutesController.deleteBook);
        this.router.put('/:book_id', BookRoutesController.updateBook);
        this.router.get('/', BookRoutesController.getAllBooks);
    }
}

export const bookRoutes: Router =  new BookRoutes().router;