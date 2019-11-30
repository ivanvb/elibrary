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
            const files = (<any> req).files;
            const {author, title} = req.body;
            let bookFilenameTxt = util.generateBookFilename({author, title}) + ".txt";
            let bookFilenameMp3 = util.generateBookFilename({author, title}) + ".mp3";
    
            let data = (<any> files).bookfile;
            let txtdata: string = Buffer.from(data.data, 'hex').toString('utf8')
    
            let mp3_content: Buffer = await TextToSpeech.convertText(txtdata);
            
            await FileStorage.uploadFile(txtdata, bookFilenameTxt);
            await FileStorage.uploadFile(mp3_content, bookFilenameMp3);
            let savedBook = await BookRepository.save(new Book(author, title, req.session.user._id));
    
            res.send("Book Uploaded")
        } else {
            res.send("Not authenticated")
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
        }
    }

    public static async getBookAudio(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            const {book_id} = req.params;
            const book: Book = await BookRepository.findOne(book_id);
            let bookName = util.generateBookFilename({author: book.__author, title: book.__title});

            const textBuffer: Buffer = await FileStorage.downloadFile(bookName + ".mp3");
            (<any>res).sendSeekable(textBuffer);
        }
    }
}