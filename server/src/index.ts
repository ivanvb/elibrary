import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './User/User.routes';

let app: express.Application = express();
(async function main(){
    dotenv.config();
    
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.use(cors());
    app.use(express.json());
    app.use('/user', userRoutes)
    app.use(express.urlencoded({extended: false}));

    const port: number = Number(process.env.PORT) || 3000;
    app.listen(port);
})()