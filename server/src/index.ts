import mongoose from 'mongoose';
import express from 'express';
import fileupload from 'express-fileupload';
import cors from 'cors';
import { userRoutes } from './User/User.routes';
import { bookRoutes } from './Book/Book.routes';

let app: express.Application = express();
(async function main(){
    
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.use(cors());
    app.use(fileupload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use('/user', userRoutes);
    app.use('/book', bookRoutes);

    const port: number = Number(process.env.PORT) || 3000;
    app.listen(port);
})()