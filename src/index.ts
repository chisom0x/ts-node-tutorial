import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors'
import router from './router/index';

const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, ()=> {
    console.log('server running on port 8080')
})

const MONGO_URL = 'mongodb://0.0.0.0:27017/readr'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(()=>{
    console.log('db connected')
})
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())
