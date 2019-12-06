import {Book, BookModel} from './Book';
export class BookRepository{

    public static async save(book: Book): Promise<Book>{
        const savedBook = await BookModel.create(book);
        return savedBook;
    }

    public static async findAll(): Promise<Book[]>{
        const books: Book[] = await BookModel.find({});
        return books;
    }
    
    public static async findOne(_id: string): Promise<Book>{
        const found = await BookModel.findOne({_id});
        return found;
    }

    public static async deleteOne(_id: string): Promise<boolean>{
        const deleted = await BookModel.deleteOne({_id});
        return !!deleted;
    }

    public static async updateOne(_id: string, author? : string, title ? : string){
        let updateObject = {};
        if(author) updateObject['author'] = author;
        if(title) updateObject['title'] = title;

        const updated = await BookModel.updateOne({_id}, updateObject);
    }
}