import booksArr from "../db.js";

//קבלת כל הספרים
export const getAllBooks = (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const result = booksArr.slice((page - 1) * limit, page * limit);
  res.json(result); 
};

//קבלת ספר לפי id
export const getBooksById = (req, res, next) => {
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) {
    return next({ status: 404, message: `Book ${req.params.id} not found` });
  }
  res.json(book);
};

//קבלת ספר לפי שם
export const getBooksByName = (req, res, next) => {
  const nameQuery = req.params.name;
  const book = booksArr.find(b => b.name.toLowerCase() === nameQuery.toLowerCase());
  if (!book) {
    return next({ status: 404, message: `Book ${nameQuery} not found` });
  }
  res.json(book);
};

//הוספת ספר
export const addBook = (req, res, next) => {
  const { id, name, author, year } = req.body;
  if (!id || !name || !author) {
    return next({ status: 400, message: "Missing required fields" });
  }

  const exists = booksArr.some(b => b.id === id);
  if (exists) {
    return next({ status: 409, message: `Book with ID ${id} already exists` });
  }

  booksArr.push(req.body);
  res.status(201).json({ message: "Book added successfully" });
};

//שינוי פרטי ספר
export const updateBook = (req, res, next) => {
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) {
    return next({ status: 404, message: `Book ${req.params.id} not found` });
  }

  if (+req.params.id !== req.body.id) {
    return next({ status: 409, message: "ID in body does not match ID in params" });
  }

  book.name = req.body.name || book.name;
  book.author = req.body.author || book.author;
  book.year = req.body.year ?? book.year;
  book.isborrow = req.body.isborrow ?? book.isborrow;
  book.lendingArr = req.body.lendingArr || book.lendingArr;

  res.json(book);
};

//ביצוע השאלה
export const borrowingBook = (req, res, next) => {
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) {
    return next({ status: 404, message: `Book ${req.params.id} not found` });
  }
  if (book.isborrow) {
    return next({ status: 400, message: "Book is already borrowed" });
  }

  book.isborrow = true;
  const idCustomer = req.params.idCustomer;
  const today = new Date();
  book.lendingArr.push({ date: today, idCustomer });
  res.json(book);
};

//ביצוע החזרה
export const returningBook = (req, res, next) => {
  const book = booksArr.find(x => x.id === +req.params.id);
  if (!book) {
    return next({ status: 404, message: `Book ${req.params.id} not found` });
  }
  if (!book.isborrow) {
    return next({ status: 400, message: "Book is not currently borrowed" });
  }

  book.isborrow = false;
  res.json(book);
};

//מחיקת ספר לפי id
export const deleteBook = (req, res, next) => {
  const id = +req.params.id;
  const index = booksArr.findIndex(x => x.id === id);
  if (index === -1) {
    return next({ status: 404, message: `Book ${req.params.id} not found` });
  }

  const deleted = booksArr.splice(index, 1);
  res.status(204).end(); 
};
