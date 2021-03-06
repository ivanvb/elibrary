import AWS from 'aws-sdk';
import util from 'util';

AWS.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key        
})

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

    public static async deleteFiles(filenames: string[]){
        let deleteKeys = filenames.map(filename => {
            return {Key: filename}
        });

        let options = {
            Bucket    : process.env.BUCKET_NAME,
            Delete: {
                Objects: deleteKeys,
                Quiet: true
            }
        };

        let asyncDelete = util.promisify(FileStorage.s3.deleteObjects.bind(FileStorage.s3));
        await asyncDelete(options);
    }

    public static async renameFile(filename: string, newFilename: string){
        let options = {
            Bucket    : process.env.BUCKET_NAME,
            CopySource: process.env.BUCKET_NAME + "/" + filename,
            Key    : newFilename,
        };

        let asyncCopy = util.promisify(FileStorage.s3.copyObject.bind(FileStorage.s3));
        await asyncCopy(options);
        await FileStorage.deleteFiles([filename]);
    }
}