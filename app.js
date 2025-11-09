import express from 'express'
import router  from './routes/book.route.js';
import userRouter from './routes/user.route.js';
import {config} from 'dotenv'
import {addDate} from './middlewares/date.middleware.js'
import { addDateForGet } from './middlewares/date.middleware.js';
const app=express();//server

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addDate)
app.use(addDateForGet)
app.use('/Books',router);
app.use('/Users',userRouter)

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});