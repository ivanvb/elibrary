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
const Book_1 = require("./Book");
class BookRepository {
    static save(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedBook = yield Book_1.BookModel.create(book);
            return savedBook;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield Book_1.BookModel.find({});
            return books;
        });
    }
    static findOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield Book_1.BookModel.findOne({ _id });
            return found;
        });
    }
    static deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield Book_1.BookModel.deleteOne({ _id });
            return !!deleted;
        });
    }
    static updateOne(_id, author, title) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateObject = {};
            if (author)
                updateObject['author'] = author;
            if (title)
                updateObject['title'] = title;
            const updated = yield Book_1.BookModel.updateOne({ _id }, updateObject);
        });
    }
}
exports.BookRepository = BookRepository;
