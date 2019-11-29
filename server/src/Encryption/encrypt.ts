import bcrypt from 'bcrypt';
import encryptorCreator, {SimpleEncryptor} from 'simple-encryptor';

export class Encryption{
    
    private static encryptor: SimpleEncryptor = encryptorCreator(process.env.ENCRYPTION_KEY);
    
    public static encrypt(text: string): string{
        return Encryption.encryptor.encrypt(text);
    }

    public static decrypt(text: string): string{
        return Encryption.encryptor.decrypt(text);
    }

    public static async hashPassword(data: string): Promise<string>{
        let encrypted: string = await bcrypt.hash(data, Number(process.env.SALT_ROUNDS));
        return encrypted;
    }

    public static async compareData(plainText: string, encryptedData: string): Promise<boolean>{
        return (await bcrypt.compare(plainText, encryptedData));
    }
}