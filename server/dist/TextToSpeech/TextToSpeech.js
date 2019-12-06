"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
});
class TextToSpeech {
    static convertText(text) {
        return new Promise((resolve, reject) => {
            let params = {
                'Text': text,
                'OutputFormat': 'mp3',
                'VoiceId': 'Kimberly'
            };
            TextToSpeech.Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err.code);
                }
                else if (data) {
                    if (data.AudioStream instanceof Buffer) {
                        resolve(data.AudioStream);
                    }
                    else {
                        reject();
                    }
                }
            });
        });
    }
}
exports.TextToSpeech = TextToSpeech;
TextToSpeech.Polly = new aws_sdk_1.default.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
});
