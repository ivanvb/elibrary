import { Request, Response, NextFunction } from 'express';
import { Book } from './Book';
import fs from 'fs';
import path from 'path';
import constants from '../constants/constants';
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
        
            let savedPath = path.join(constants.tmp_files_dir, `/${data.name}`)
            await data.mv(savedPath)
    
            let txtdata: string = fs.readFileSync(savedPath).toString();
    
            let mp3_filepath: string = await TextToSpeech.convertText(txtdata, bookFilenameTxt);
            let mp3_data =  fs.readFileSync(mp3_filepath);
            
            let uploaded_txt = await FileStorage.uploadFile(txtdata, bookFilenameTxt);
            let uploaded_mp3 = await FileStorage.uploadFile(mp3_data, bookFilenameMp3);
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

            const downloadPath = await FileStorage.downloadFile(bookName + ".txt");
            const text = fs.readFileSync(downloadPath, 'utf8');

            res.send({text});
        }
    }

    public static async getBookAudio(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req)){
            const {book_id} = req.params;
            const book: Book = await BookRepository.findOne(book_id);
            let bookName = util.generateBookFilename({author: book.__author, title: book.__title});

            let fileUrl: string = await FileStorage.getFileLink(bookName + ".mp3");
            res.send({fileUrl});
        }
    }
}