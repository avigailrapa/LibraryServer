import { Router } from "express";
import { getAllBooks, getBooksById, getBooksByName, addBook, updateBook,borrowingBook,returningBook,deleteBook} from "../controllers/book.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { bookSchemas } from "../models/book.model.js";
import { upload } from '../middlewares/upload-files.middleware.js';

const router=Router();

//קבלת כל הספרים
router.get('/',getAllBooks)

//קבלת ספר לפי id 
router.get('/:id',getBooksById)

//קבלת ספר לפי שם
router.get('/search/:name', getBooksByName);

//הוספת ספר
router.post('/', upload.single('img'), addBook);

//שינוי פרטי ספר
router.patch('/:id',updateBook)

//ביצוע השאלה
router.patch('/:id/:idCustomer',joiValidator(bookSchemas.borrowBook),borrowingBook)

//ביצוע החזרה
router.patch('/:id/return',returningBook)


//מחיקת ספר לפי id
router.delete('/:id',deleteBook)

export default router
















   