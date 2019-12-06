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
const FileStorage_1 = require("../FileStorage/FileStorage");
const Book_repository_1 = require("./Book.repository");
const auth_1 = require("../Auth/auth");
const util_1 = require("../util/util");
class BookRoutesController {
    static addBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req) && auth_1.Auth.isAdmin(req)) {
                const { author, title } = req.body;
                let bookFilename = util_1.util.generateBookFilename({ author, title });
                util_1.util.saveTxtAndMp3(bookFilename, req);
                let savedBook = yield Book_repository_1.BookRepository.save(new Book_1.Book(author, title, req.session.user._id));
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    static getBookText(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                const { book_id } = req.params;
                const book = yield Book_repository_1.BookRepository.findOne(book_id);
                let bookName = util_1.util.generateBookFilename({ author: book.__author, title: book.__title });
                const textBuffer = yield FileStorage_1.FileStorage.downloadFile(bookName + ".txt");
                const text = textBuffer.toString();
                res.send({ text });
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    static getBookAudio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                const { book_id } = req.params;
                const book = yield Book_repository_1.BookRepository.findOne(book_id);
                let bookName = util_1.util.generateBookFilename({ author: book.__author, title: book.__title });
                const textBuffer = yield FileStorage_1.FileStorage.downloadFile(bookName + ".mp3");
                res.sendSeekable(textBuffer);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    static deleteBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                const { book_id } = req.params;
                const book = yield Book_repository_1.BookRepository.findOne(book_id);
                let bookName = util_1.util.generateBookFilename({ author: book.__author, title: book.__title });
                yield FileStorage_1.FileStorage.deleteFiles([bookName + ".txt", bookName + ".mp3"]);
                const deleted = yield Book_repository_1.BookRepository.deleteOne(book_id);
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    static updateBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                const { book_id } = req.params;
                const { author, title } = req.body;
                let newBookName;
                let files = req.files;
                const book = yield Book_repository_1.BookRepository.findOne(book_id);
                let bookName = util_1.util.generateBookFilename({ author: book.__author, title: book.__title });
                if (author || title) {
                    newBookName = util_1.util.generateBookFilename({
                        author: (author ? author : book.__author),
                        title: (title ? title : book.__title)
                    });
                    if (files) {
                        yield util_1.util.saveTxtAndMp3(newBookName, req);
                        yield FileStorage_1.FileStorage.deleteFiles([bookName + ".txt", bookName + ".mp3"]);
                    }
                    else {
                        yield FileStorage_1.FileStorage.renameFile(bookName + ".txt", newBookName + ".txt");
                        yield FileStorage_1.FileStorage.renameFile(bookName + ".mp3", newBookName + ".mp3");
                    }
                    yield Book_repository_1.BookRepository.updateOne(book_id, (author ? author : null), (title ? title : null));
                }
                else {
                    yield util_1.util.saveTxtAndMp3(bookName, req);
                }
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    static getAllBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                let books = yield Book_repository_1.BookRepository.findAll();
                res.send({ books });
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    static getSingleBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_1.Auth.isAuthenticated(req)) {
                const { book_id } = req.params;
                let book = yield Book_repository_1.BookRepository.findOne(book_id);
                res.send({ book });
            }
            else {
                res.sendStatus(400);
            }
        });
    }
}
exports.BookRoutesController = BookRoutesController;
