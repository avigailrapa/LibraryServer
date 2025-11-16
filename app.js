import express from 'express'
import router  from './routes/book.route.js';
import userRouter from './routes/user.route.js';
import {config} from 'dotenv'
import {addDate,addDateForGet} from './middlewares/date.middleware.js'
import {errorsHandler,notFound} from './middlewares/errors.middleware.js'
import cors from 'cors'
import morgan from 'morgan';

const app=express();//server
config();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.use(addDate)
app.use(addDateForGet)

app.use('/Books',router);
app.use('/Users',userRouter)

app.use(notFound)
app.use(errorsHandler)


const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});