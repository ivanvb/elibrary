import { Request, Response, NextFunction } from 'express';
import { Book } from './Book';

export class BookRoutesController {

    public static async addBook(req: Request, res: Response, next: NextFunction){
     
        const files = (<any> req).files;
        const {author, title} = req.body;
        
        res.send("Book Uploaded")
    }
}