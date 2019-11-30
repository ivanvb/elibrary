import mongoose from 'mongoose';
import express from 'express';
import fileupload from 'express-fileupload';
import cors from 'cors';
import session, {SessionOptions} from 'express-session';
import { userRoutes } from './User/User.routes';
import { bookRoutes } from './Book/Book.routes';
import sendSeekable from 'send-seekable';

let app: express.Application = express();
(async function main(){
    
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000}
    }))
    app.use(cors());
    app.use(fileupload());
    app.use(express.json());
    app.use(sendSeekable);
    app.use(express.urlencoded({extended: false}));

    app.use('/user', userRoutes);
    app.use('/book', bookRoutes);

    const port: number = Number(process.env.PORT) || 3001;
    app.listen(port);
})()