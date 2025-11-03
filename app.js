import express from 'express'
import router  from './routes/book.route.js';
import userRouter from './routes/user.route.js';
import {config} from 'dotenv'

config();
const app=express();//server

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/booksArr',router);
app.use('/userArr',userRouter)

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});