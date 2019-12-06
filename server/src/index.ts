import mongoose from 'mongoose';
import express from 'express';
import fileupload from 'express-fileupload';
import cors from 'cors';
import session, {SessionOptions} from 'express-session';
import { userRoutes } from './User/User.routes';
import { bookRoutes } from './Book/Book.routes';
import sendSeekable from 'send-seekable';
import path from 'path';

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
        cookie: { maxAge: Date.now() + (30 * 86400 * 1000)}
    }))
    app.use(cors());
    app.use(fileupload());
    app.use(express.json());
    app.use(sendSeekable);
    app.use(express.urlencoded({extended: false}));

    app.use('/user', userRoutes);
    app.use('/book', bookRoutes);
    app.use(express.static(path.join(path.resolve(__dirname, '..', '..'), '/client/build/')));

    const port: number = Number(process.env.PORT) || 80;
    app.listen(port, ()=>{
        console.log("listening on " + port);
    });

    app.get('*', (req: express.Request, res: express.Response) =>{
        res.sendFile(path.join(path.resolve(__dirname, '..', '..'), '/client/build/index.html'));
    });
})()