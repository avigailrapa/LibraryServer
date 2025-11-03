import { Router } from "express";
import booksArr from './db.js'
const router=Router();

//קבלת כל הספרים
router.get('/Books', (req, res) => {
  if(!booksArr||booksArr.lenght==0)
      return res.status(404).send("No Books")
    const { page = 1, limit = 5} = req.query;
    const result = booksArr.slice((page - 1) * limit, page * limit);             
    res.json(result);
});

//קבלת ספר לפי id 
router.get('/Books/:id',(req,res)=>{
    const book=booksArr.find(x=>x.id === +req.params.id)
    if(!book)  return res.status(404).send("Book not found")
    res.json(book)
})

//קבלת ספר לפי שם
router.get('/Books', (req, res) => {
    const nameQuery = req.query.name;
     const book = booksArr.find(
      b => b.name.toLowerCase() === nameQuery.toLowerCase()
    );
    if (!book) return res.status(404).send("Book not found");
    return res.json(book);
  }
);

//הוספת ספר
router.post('/Books', (req, res) => {
  const { id, name, author, year } = req.body;
  if (!id || !name || !author) {
    return res.status(400).send("Missing required fields");
  }

  const exists = booksArr.some(b => b.id === id);
  if (exists) {
    return res.status(409).send("Book with this ID already exists");
  }

  booksArr.push(req.body);
  res.status(201).json({ message: "Book added successfully" });
});

//שינוי פרטי ספר
router.patch('/Books/:id', (req, res) => {
    const book = booksArr.find(x => x.id === +req.params.id);
    if (!book) return res.status(404).send("Book not found");

    
    if (req.body.name !== undefined) book.name = req.body.name;
    if (req.body.author !== undefined) book.author = req.body.author;
    if (req.body.year !== undefined) book.year = req.body.year;
    if (req.body.isborrow !== undefined) book.isborrow = req.body.isborrow;
    if (req.body.lendingArr !== undefined) book.lendingArr = req.body.lendingArr;

    res.json(book);
});

//ביצוע השאלה
router.patch('/Books/:id/:idCustomer', (req, res) => {
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) return res.status(404).send("Book not found");
  
  if (book.isborrow) {
    return res.status(400).send("Book is already borrowed");
  }

  book.isborrow = true;
  const idCustomer = req.params.idCustomer;
  const today = new Date();
  book.lendingArr.push({ date: today, idCustomer });
  res.json(book);
});

//ביצוע החזרה
router.patch('/Books/:id/return', (req, res) => {
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) return res.status(404).send("Book not found");
  if (!book.isborrow) return res.status(400).send("Book is not currently borrowed");
  
  book.isborrow = false;
  res.json(book);
});

//מחיקת ספר לפי id
router.delete('/Books/:id', (req, res) => {
  const id = +req.params.id;
  const index = booksArr.findIndex(x => x.id === id);
  if (index === -1) return res.status(404).send("Book not found");
  const deleted = booksArr.splice(index, 1);
  res.json(deleted[0]);
});

export default router
















   