import { Router } from "express";
import booksArr from "../db.js";
import { getAllBooks, getBooksById, getBooksByName, addBook, updateBook,borrowingBook,returningBook,deleteBook} from "../controllers/book.controller.js";

const router=Router();

//קבלת כל הספרים
router.get('/',getAllBooks)


//קבלת ספר לפי id 
router.get('/:id',getBooksById)

//קבלת ספר לפי שם
router.get('/',getBooksByName)


//הוספת ספר
router.post('/',addBook)

//שינוי פרטי ספר
router.patch('/:id',updateBook)


//ביצוע השאלה
router.patch('/:id/:idCustomer',borrowingBook)


//ביצוע החזרה
router.patch('/:id/return',returningBook)


//מחיקת ספר לפי id
router.delete('/:id',deleteBook)

export default router
















   