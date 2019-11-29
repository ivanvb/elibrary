import { Request, Response, NextFunction } from 'express';
import { Book } from './Book';
import fs from 'fs';
import path from 'path';
import constants from '../constants/constants';
import { TextToSpeech } from '../TextToSpeech/TextToSpeech';
import { FileStorage } from '../FileStorage/FileStorage';
import { BookRepository } from './Book.repository';
import { Auth } from '../Auth/auth';

export class BookRoutesController {

    public static async addBook(req: Request, res: Response, next: NextFunction){
        if(Auth.isAuthenticated(req) && Auth.isAdmin(req)){
            const files = (<any> req).files;
            const {author, title} = req.body;
            let author_no_wspaces = author.replace(/ /g, '');
            let title_no_wspaces = title.replace(/ /g, '');
    
            let data = (<any> files).bookfile;
        
            let savedPath = path.join(constants.tmp_files_dir, `/${data.name}`)
            await data.mv(savedPath)
    
            let txtdata: string = fs.readFileSync(savedPath).toString();
    
            let mp3_filepath: string = await TextToSpeech.convertText(txtdata, `${author_no_wspaces}_${title_no_wspaces}`);
            let mp3_data =  fs.readFileSync(mp3_filepath);
            
            //let uploaded_txt = await FileStorage.uploadFile(txtdata, `${author_no_wspaces}_${title_no_wspaces}.txt`);
            //let uploaded_mp3 = await FileStorage.uploadFile(mp3_data, `${author_no_wspaces}_${title_no_wspaces}.mp3`);
            let savedBook = await BookRepository.save(new Book(author, title, req.session.user._id));
    
            res.send("Book Uploaded")
        } else {
            res.send("Not authenticated")
        }


    }
}