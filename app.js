import express from 'express'
import booksArr from './db.js'

const app=express()//server

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port=5000

app.listen(port,()=>
    console.log(`Example app listening on port ${port}`)
)
//קבלת כל הספרים
app.get('/Books', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const paginatedBooks = booksArr.slice((page - 1) * limit, page * limit);
   res.json(paginatedBooks);
});

//קבלת ספר לפי id 
app.get('/Books/:id',(req,res)=>{
    const book=booksArr.find(x=>x.id === +req.params.id)
    if(!book)  return res.status(404).send("Book not found")
    res.json(book)
})

//קבלת ספר לפי שם
app.get('/Books', (req, res) => {
    const nameQuery = req.query.name;
     const book = booksArr.find(
      b => b.name.toLowerCase() === nameQuery.toLowerCase()
    );
    if (!book) return res.status(404).send("Book not found");
    return res.json(book);
  }
  
);

//הוספת ספר
app.post('/Books',(req,res)=>{
    booksArr.push(req.body)
    res.send(req.body)
})
//שינוי פרטי ספר
app.patch('/Books/:id',(req,res)=>{
    const book=booksArr.find(x=>x.id === +req.params.id)
    if(!book) return res.status(404).send("Book not found")
    Object.assign(book, req.body);
    res.json(book)
})
//ביצוע השאלה
app.patch('/Books/:id/:idCustomer', (req, res) => {
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) return res.status(404).send("Book not found");
  if (book.isborrow==false)
  {
  book.isborrow = true;
  const idCustomer = req.params.idCustomer;
  const today = new Date()
  book.lendingArr.push({ date: today, idCustomer });
  }
  res.json(book);
})
//ביצוע החזרה
app.patch('/Books/:id',(req,res)=>{
    const book=booksArr.find(x=>x.id === +req.params.id)
    if(!book) return res.status(404).send("Book not found")
    book.isborrow=false
    res.json(book)
})
//מחיקת ספר לפי id
app.delete('/Books/:id', (req, res) => {
  const id = +req.params.id;
  const index = booksArr.findIndex(x => x.id === id);
  if (index === -1) return res.status(404).send("Book not found");
  const deleted = booksArr.splice(index, 1);
  res.json(deleted[0]);
});


















   