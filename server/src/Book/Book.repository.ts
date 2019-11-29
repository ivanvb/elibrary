import {Book, BookModel} from './Book';
export class BookRepository{

    public static async save(book: Book): Promise<Book>{
        const savedBook = await BookModel.create(book);
        return savedBook;
    }
}