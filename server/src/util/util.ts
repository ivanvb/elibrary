import { Book } from "../Book/Book";
import { Request } from "express";
import { TextToSpeech } from "../TextToSpeech/TextToSpeech";
import { FileStorage } from "../FileStorage/FileStorage";

export class util{
    
    public static generateBookFilename(book: {author: string, title: string}): string{
        const {author, title} = book;
        let author_no_wspaces = author.replace(/ /g, '');
        let title_no_wspaces = title.replace(/ /g, '');

        return `${author_no_wspaces}_${title_no_wspaces}`;
    }

    public static async saveTxtAndMp3(filename: string, req: Request){
        let files = (<any>req).files;

        let txtdata: string = Buffer.from(files.bookfile.data, 'hex').toString('utf8')
        let mp3_content: Buffer = await TextToSpeech.convertText(txtdata);

        await FileStorage.uploadFile(txtdata, filename + ".txt");
        await FileStorage.uploadFile(mp3_content, filename + ".mp3");
    }
}