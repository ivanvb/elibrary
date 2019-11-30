import AWS from 'aws-sdk';
import util from 'util';

export class FileStorage{

    private static s3: AWS.S3 = new AWS.S3();

    public static async uploadFile(content: string | Buffer, filename: string){
        let asyncUpload = util.promisify(FileStorage.s3.upload.bind(FileStorage.s3));

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: content
        }

        let uploadedPath = await asyncUpload(params);
        return uploadedPath;
    }

    public static async downloadFile(filename: string): Promise<Buffer>{
        return new Promise((resolve, reject)=>{
            let options = {
                Bucket    : process.env.BUCKET_NAME,
                Key    : filename,
            };
        
            let fileStream = FileStorage.s3.getObject(options).createReadStream();
            const chunks = [];
            fileStream.on('data', data => chunks.push(data));
            fileStream.on('end', ()=>{
                resolve(Buffer.concat(chunks));
            })
        })
    }
}