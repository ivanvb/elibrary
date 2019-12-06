import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key        
})

export class TextToSpeech{
    private static Polly: AWS.Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: 'us-east-1'
    });


    public static convertText(text: string): Promise<Buffer>{
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
                        resolve(data.AudioStream);
                    } else {
                        reject();
                    }
                }
            })
        })
    }


}