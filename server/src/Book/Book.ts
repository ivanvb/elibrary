import { prop, Ref } from '@typegoose/typegoose';
import { User } from '../User/User';

export class Book{
    
    private __id: Ref<Book>;
    @prop()
    private _author: string;
    @prop()
    private _title: string;
    @prop()
    private _aggregator: Ref<User>;

    constructor(_id: Ref<Book>, author: string, title: string, ){
        this.__id = _id;
        this._author =  author;
        this._title = title;
    }

    get _id(): Ref<Book>{
        return this.__id;
    }

    get author(): string{
        return this._author;
    }

    get title(): string{
        return this._title;
    }

    get aggregator(): Ref<User>{
        return this._aggregator;
    }
}