"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const util_1 = __importDefault(require("util"));
class FileStorage {
    static uploadFile(content, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let asyncUpload = util_1.default.promisify(FileStorage.s3.upload.bind(FileStorage.s3));
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: filename,
                Body: content
            };
            let uploadedPath = yield asyncUpload(params);
            return uploadedPath;
        });
    }
    static downloadFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let options = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: filename,
                };
                let fileStream = FileStorage.s3.getObject(options).createReadStream();
                const chunks = [];
                fileStream.on('data', data => chunks.push(data));
                fileStream.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
            });
        });
    }
    static deleteFiles(filenames) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleteKeys = filenames.map(filename => {
                return { Key: filename };
            });
            let options = {
                Bucket: process.env.BUCKET_NAME,
                Delete: {
                    Objects: deleteKeys,
                    Quiet: true
                }
            };
            let asyncDelete = util_1.default.promisify(FileStorage.s3.deleteObjects.bind(FileStorage.s3));
            yield asyncDelete(options);
        });
    }
    static renameFile(filename, newFilename) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                Bucket: process.env.BUCKET_NAME,
                CopySource: process.env.BUCKET_NAME + "/" + filename,
                Key: newFilename,
            };
            let asyncCopy = util_1.default.promisify(FileStorage.s3.copyObject.bind(FileStorage.s3));
            yield asyncCopy(options);
            yield FileStorage.deleteFiles([filename]);
        });
    }
}
exports.FileStorage = FileStorage;
FileStorage.s3 = new aws_sdk_1.default.S3();
