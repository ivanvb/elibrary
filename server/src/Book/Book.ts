import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { User } from '../User/User';

export class Book{
    
    private _id: Ref<Book>;
    @prop()
    private author: string;
    @prop()
    private title: string;
    @prop({ref: "User"})
    private aggregator: Ref<User>;

    constructor(author: string, title: string, aggregator? : Ref<User>, _id ? : Ref<Book>){
        this._id = _id;
        this.author =  author;
        this.title = title;
        if(aggregator) this.aggregator = aggregator;
    }

    get __id(): Ref<Book>{
        return this.__id;
    }

    get __author(): string{
        return this.author;
    }

    get __title(): string{
        return this.title;
    }

    get __aggregator(): Ref<User>{
        return this.aggregator;
    }
}

export const BookModel = getModelForClass(Book);
