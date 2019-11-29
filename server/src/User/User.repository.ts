import {User, UserModel} from './User';
import {Encryption} from '../Encryption/encrypt';

export class UserRepository{
    
    public static async save(user: User): Promise<User>{
        user._password =  await Encryption.hashPassword(user._password);

        const savedUser: User = await UserModel.create(user);
        return savedUser;
    }

    public static async findOne(opts: {email: string, _id: string}): Promise<User>{
        const {email, _id} = opts;
        let found: User;
        if(_id){
            found = await UserModel.findOne({_id});
        } else {
            found = await UserModel.findOne({email});
        }

        return found;
    }
}