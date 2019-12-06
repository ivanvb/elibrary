import { Request, Response, NextFunction } from 'express';
import { Book } from './Book';
import { TextToSpeech } from '../TextToSpeech/TextToSpeech';
import { FileStorage } from '../FileStorage/FileStorage';
import { BookRepository } from './Book.repository';
import { Auth } from '../Auth/auth';
import { util } from '../util/util';

export class BookRoutesController {

    public static async addBook(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req) && Auth.isAdmin(req)){
            const {author, title} = req.body;
            let file = (<any>req).files.bookfile;
            
            if(file.size <= 3000){
                let bookFilename = util.generateBookFilename({author, title})
            
                await util.saveTxtAndMp3(bookFilename, req);
    
                let savedBook = await BookRepository.save(new Book(author, title, req.session.user._id));
        
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(401)
        }
    }

    public static async getBookText(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            const {book_id} = req.params;
            const book: Book = await BookRepository.findOne(book_id);
            let bookName = util.generateBookFilename({author: book.__author, title: book.__title});

            const textBuffer: Buffer = await FileStorage.downloadFile(bookName + ".txt");
            const text: string = textBuffer.toString();

            res.send({text});
        } else {
            res.sendStatus(400);
        }
    }

    public static async getBookAudio(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            const {book_id} = req.params;
            const book: Book = await BookRepository.findOne(book_id);
            let bookName = util.generateBookFilename({author: book.__author, title: book.__title});

            const textBuffer: Buffer = await FileStorage.downloadFile(bookName + ".mp3");
            (<any>res).sendSeekable(textBuffer);
        } else {
            res.sendStatus(400);
        }
    }

    public static async deleteBook(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            const {book_id} = req.params;
            const book: Book = await BookRepository.findOne(book_id);
            let bookName = util.generateBookFilename({author: book.__author, title: book.__title});

            await FileStorage.deleteFiles([bookName + ".txt", bookName + ".mp3"]);
            const deleted: boolean = await BookRepository.deleteOne(book_id);

            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    }

    public static async updateBook(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            const {book_id} = req.params;
            const {author, title} = req.body;

            let newBookName;
            let files = (<any>req).files
            if(files.bookfile.size <= 3000){
                const book: Book = await BookRepository.findOne(book_id);
                let bookName = util.generateBookFilename({author: book.__author, title: book.__title});
    
                if(author || title){
                    newBookName = util.generateBookFilename({
                        author: (author ? author : book.__author),
                        title: (title ? title : book.__title)
                    }); 
    
                    if(files){
                        await util.saveTxtAndMp3(newBookName, req);
                        await FileStorage.deleteFiles([bookName + ".txt", bookName + ".mp3"]);
                    } else {
                        await FileStorage.renameFile(bookName + ".txt", newBookName + ".txt");
                        await FileStorage.renameFile(bookName + ".mp3", newBookName + ".mp3");
                    }
                    await BookRepository.updateOne(book_id, (author ? author : null), (title ? title : null));
                } else {
                    await util.saveTxtAndMp3(bookName, req);
                }
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(401);
        }
    }

    public static async getAllBooks(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            let books = await BookRepository.findAll();
            res.send({books});
        } else {
            res.sendStatus(400);
        }
    }

    public static async getSingleBook(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            const {book_id} = req.params;
            let book = await BookRepository.findOne(book_id);
            res.send({book});
        } else {
            res.sendStatus(400);
        }
    }
}