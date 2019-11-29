import {Book, BookModel} from './Book';
export class BookRepository{

    public static async save(book: Book): Promise<Book>{
        const savedBook = await BookModel.create(book);
        return savedBook;
    }
    
    public static async findOne(_id: string): Promise<Book>{
        const found = await BookModel.findOne({_id});
        return found;
    }
}