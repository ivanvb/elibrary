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
Object.defineProperty(exports, "__esModule", { value: true });
const TextToSpeech_1 = require("../TextToSpeech/TextToSpeech");
const FileStorage_1 = require("../FileStorage/FileStorage");
class util {
    static generateBookFilename(book) {
        const { author, title } = book;
        let author_no_wspaces = author.replace(/ /g, '');
        let title_no_wspaces = title.replace(/ /g, '');
        return `${author_no_wspaces}_${title_no_wspaces}`;
    }
    static saveTxtAndMp3(filename, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = req.files;
            let txtdata = Buffer.from(files.bookfile.data, 'hex').toString('utf8');
            let mp3_content = yield TextToSpeech_1.TextToSpeech.convertText(txtdata);
            yield FileStorage_1.FileStorage.uploadFile(txtdata, filename + ".txt");
            yield FileStorage_1.FileStorage.uploadFile(mp3_content, filename + ".mp3");
        });
    }
}
exports.util = util;
