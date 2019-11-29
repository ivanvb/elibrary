import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export class TextToSpeech{
    private static Polly: AWS.Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: 'us-east-1'
    });


    public static convertText(text: string, filename: string): Promise<string>{
        let tmp_filepath: string = path.join(path.resolve(__dirname, '../..'), '/tmp/');

        !fs.existsSync(tmp_filepath) && fs.mkdirSync(tmp_filepath);

        return new Promise((resolve , reject)=>{
            let params = {
                'Text': text,
                'OutputFormat': 'mp3',
                'VoiceId': 'Kimberly'
            }
    
            TextToSpeech.Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err.code)
                } else if (data) {
                    if (data.AudioStream instanceof Buffer) {
                        let filepath = path.join(tmp_filepath, `${filename}.mp3`);

                        fs.writeFile(filepath, data.AudioStream, (err: Error)=>{
                            if(!err){
                                resolve(filepath);
                            } else {
                                reject(err);
                            }
                        })
                    } else {
                        reject();
                    }
                }
            })
        })
    }


}