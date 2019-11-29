import { Request, Response, NextFunction } from 'express';
import { Book } from './Book';
import fs from 'fs';
import path from 'path';
import constants from '../constants/constants';
import { TextToSpeech } from '../TextToSpeech/TextToSpeech';
import { FileStorage } from '../FileStorage/FileStorage';

export class BookRoutesController {

    public static async addBook(req: Request, res: Response, next: NextFunction){
     
        const files = (<any> req).files;
        let {author, title} = req.body;
        author = author.replace(/ /g, '');
        title = title.replace(/ /g, '');


        let data = (<any> files).bookfile;
    
        let savedPath = path.join(constants.tmp_files_dir, `/${data.name}`)
        await data.mv(savedPath)

        let txtdata: string = fs.readFileSync(savedPath).toString();

        let mp3_filepath: string = await TextToSpeech.convertText(txtdata, `${author}_${title}`);
        let mp3_data =  fs.readFileSync(mp3_filepath);
        
        let uploaded_txt = await FileStorage.uploadFile(txtdata, `${author}_${title}.txt`);
        let uploaded_mp3 = await FileStorage.uploadFile(mp3_data, `${author}_${title}.mp3`)

        res.send("Book Uploaded")
    }
}