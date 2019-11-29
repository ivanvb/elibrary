import {User, UserModel} from './User';
import {Encryption} from '../Encryption/encrypt';

export class UserRepository{
    
    public static async save(user: User){
        user._name = await Encryption.hashPassword(user._name);
        user._email =  await Encryption.hashPassword(user._email);
        user._password =  await Encryption.hashPassword(user._password);

        const savedUser: User = await UserModel.create(user);
        return savedUser;
    }
}