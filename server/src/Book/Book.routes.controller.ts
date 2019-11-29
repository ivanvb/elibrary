import { Request, Response, NextFunction } from 'express';
import { Book } from './Book';
import fs from 'fs';
import { TextToSpeech } from '../TextToSpeech/TextToSpeech';

export class BookRoutesController {

    public static async addBook(req: Request, res: Response, next: NextFunction){
     
        const files = (<any> req).files;
        let {author, title} = req.body;
        author = author.replace(/ /g, '');
        title = title.replace(/ /g, '');

        let data: string = (<any> files).bookfile.tempFilePath;
        let txtdata: string  = fs.readFileSync(data, 'utf8');
        let mp3_filepath: string = await TextToSpeech.convertText(txtdata, `${author}_${title}`);
        res.send("Book Uploaded")
    }
}