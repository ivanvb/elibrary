import bcrypt from 'bcrypt';

export class Encryption{

    public static async encryptData(data: string): Promise<string>{
        let encrypted: string = await bcrypt.hash(data, Number(process.env.SALT_ROUNDS));
        return encrypted;
    }

    public static async compareData(plainText: string, encryptedData: string): Promise<boolean>{
        return (await bcrypt.compare(plainText, encryptedData));
    }
}