
//קבלת כל הספרים
export const getAllBooks=(req, res) => {
  if(!booksArr||booksArr.lenght==0)
      return res.status(404).send("No Books")
    const { page = 1, limit = 5} = req.query;
    const result = booksArr.slice((page - 1) * limit, page * limit);             
    res.json(result);
}

//קבלת ספר לפי id 
export const getBooksById=(req,res)=>{
    const book=booksArr.find(x=>x.id === +req.params.id)
    if(!book)  return res.status(404).send("Book not found")
    res.json(book)
}

//קבלת ספר לפי שם
export const getBooksByName=(req, res) => {
    const nameQuery = req.query.name;
     const book = booksArr.find(
      b => b.name.toLowerCase() === nameQuery.toLowerCase()
    );
    if (!book) return res.status(404).send("Book not found");
    return res.json(book);
  }


//הוספת ספר
export const addBook=(req, res) => {
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
}

//שינוי פרטי ספר
export const updateBook=(req, res) => {   
     const book = booksArr.find(x => x.id === +req.params.id);
    if (!book) return res.status(404).send("Book not found");

    
    if (req.body.name !== undefined) book.name = req.body.name;
    if (req.body.author !== undefined) book.author = req.body.author;
    if (req.body.year !== undefined) book.year = req.body.year;
    if (req.body.isborrow !== undefined) book.isborrow = req.body.isborrow;
    if (req.body.lendingArr !== undefined) book.lendingArr = req.body.lendingArr;

    res.json(book);
}

//ביצוע השאלה
export const borrowingBook=(req, res) => {   
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
}

//ביצוע החזרה
export const returningBook=(req, res) => {   
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) return res.status(404).send("Book not found");
  if (!book.isborrow) return res.status(400).send("Book is not currently borrowed");
  
  book.isborrow = false;
  res.json(book);
}
//מחיקת ספר לפי id
export const deleteBook=(req, res) => {   
  const id = +req.params.id;
  const index = booksArr.findIndex(x => x.id === id);
  if (index === -1) return res.status(404).send("Book not found");
  const deleted = booksArr.splice(index, 1);
  res.json(deleted[0]);
}

export default router
















   