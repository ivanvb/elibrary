"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_routes_controller_1 = require("./Book.routes.controller");
class BookRoutes {
    constructor() {
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', Book_routes_controller_1.BookRoutesController.addBook);
        this.router.get('/:book_id', Book_routes_controller_1.BookRoutesController.getSingleBook);
        this.router.get('/text/:book_id', Book_routes_controller_1.BookRoutesController.getBookText);
        this.router.get('/audio/:book_id', Book_routes_controller_1.BookRoutesController.getBookAudio);
        this.router.delete('/:book_id', Book_routes_controller_1.BookRoutesController.deleteBook);
        this.router.put('/:book_id', Book_routes_controller_1.BookRoutesController.updateBook);
        this.router.get('/', Book_routes_controller_1.BookRoutesController.getAllBooks);
    }
}
exports.bookRoutes = new BookRoutes().router;
