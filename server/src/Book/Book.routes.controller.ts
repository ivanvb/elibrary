import { Request, Response, NextFunction } from 'express';
import { Book } from './Book';

export class BookRoutesController {

    public static async addBook(req: Request, res: Response, next: NextFunction){
     
        res.send("Book Uploaded")
    }
}