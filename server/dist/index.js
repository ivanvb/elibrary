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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const User_routes_1 = require("./User/User.routes");
const Book_routes_1 = require("./Book/Book.routes");
const send_seekable_1 = __importDefault(require("send-seekable"));
const path_1 = __importDefault(require("path"));
let app = express_1.default();
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.use(express_session_1.default({
            secret: 'secret_key',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: Date.now() + (30 * 86400 * 1000) }
        }));
        app.use(cors_1.default());
        app.use(express_fileupload_1.default());
        app.use(express_1.default.json());
        app.use(send_seekable_1.default);
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use('/user', User_routes_1.userRoutes);
        app.use('/book', Book_routes_1.bookRoutes);
        app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(__dirname, '..', '..'), '/client/build/')));
        const port = Number(process.env.PORT) || 80;
        app.listen(port, () => {
            console.log("listening on " + port);
        });
        app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(path_1.default.resolve(__dirname, '..', '..'), '/client/build/index.html'));
        });
    });
})();
