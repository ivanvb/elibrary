import { prop, Ref } from '@typegoose/typegoose';

export class User{

    private __id: Ref<User>
    @prop()
    private _name: string;
    @prop()
    private _email: string;
    @prop()
    private _password: string;
    @prop()
    private _admin: boolean

    constructor(_id: Ref<User>, name: string, email: string, password: string, admin? : boolean){
        this.__id = _id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._admin = (admin ? admin : false);
    }

    get _id(): Ref<User>{
        return this.__id;
    } 

    get name(): string{
        return this._name;
    }

    get email(): string{
        return this._email;
    }

    get password(): string{
        return this._password;
    }

    get admin(): boolean{
        return this._admin;
    }
}