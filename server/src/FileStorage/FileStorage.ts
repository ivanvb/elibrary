import AWS from 'aws-sdk';
import fs from 'fs';
import util from 'util';
import constants from '../constants/constants';
import awsCloudFront from 'aws-cloudfront-sign';

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

    public static async downloadFile(filename: string): Promise<string>{
        return new Promise((resolve, reject)=>{
            let options = {
                Bucket    : process.env.BUCKET_NAME,
                Key    : filename,
            };
        
            let fileStream = FileStorage.s3.getObject(options).createReadStream();
            let tmp_filepath = constants.tmp_files_dir + '/' + filename
            let stream = fs.createWriteStream(tmp_filepath);
            fileStream.pipe(stream);
            fileStream.on('end', ()=>{
                resolve(tmp_filepath)
            })
        })
    }

    public static async getFileLink(filename: string){
        return new Promise(function (resolve, reject){
            var options = {
                keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID,
                privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH
            };
    
            var signedUrl =  awsCloudFront.getSignedUrl(process.env.CLOUDFRONT_URL + "/" + filename, options);
            resolve(signedUrl);
        })
    }
}