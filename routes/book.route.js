import { Router } from "express";
import booksArr from './db.js'
import { getAllBooks, getBooksById, getBooksByName, addBook, updateBook,borrowingBook,returningBook,deleteBook} from "../controllers/book.controller.js";

const router=Router();

//קבלת כל הספרים
router.get('/',getAllBooks)


//קבלת ספר לפי id 
router.get('/Books/:id',getBooksById)

//קבלת ספר לפי שם
router.get('/Books',getBooksByName)


//הוספת ספר
router.post('/Books',addBook)

//שינוי פרטי ספר
router.patch('/Books/:id',updateBook)


//ביצוע השאלה
router.patch('/Books/:id/:idCustomer',borrowingBook)


//ביצוע החזרה
router.patch('/Books/:id/return',returningBook)


//מחיקת ספר לפי id
router.delete('/Books/:id',deleteBook)

export default router
















   