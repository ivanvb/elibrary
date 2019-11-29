import { Book } from "../Book/Book";

export class util{
    
    public static generateBookFilename(book: {author: string, title: string}): string{
        const {author, title} = book;
        let author_no_wspaces = author.replace(/ /g, '');
        let title_no_wspaces = title.replace(/ /g, '');

        return `${author_no_wspaces}_${title_no_wspaces}`;
    }

    
}