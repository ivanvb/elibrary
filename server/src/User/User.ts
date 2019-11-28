import { prop, Ref, getModelForClass } from '@typegoose/typegoose';

export class User{

    private _id: Ref<User>
    @prop()
    private name: string;
    @prop()
    private email: string;
    @prop()
    private password: string;
    @prop()
    private admin: boolean

    constructor(name: string, email: string, password: string, admin? : boolean, _id? : Ref<User>){
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = (admin ? admin : false);
    }

    set _name(name: string){
        this.name = name;
    }

    set _email(email: string){
        this.email =  email;
    }

    set _password(password: string){
        this.password = password;
    }

    
    get __id(): Ref<User>{
        return this._id;
    } 

    get _name(): string{
        return this.name;
    }

    get _email(): string{
        return this.email;
    }

    get _password(): string{
        return this.password;
    }

    get _admin(): boolean{
        return this.admin;
    }
}

export const UserModel = getModelForClass(User);
