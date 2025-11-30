import { isValidObjectId } from "mongoose";
import Book from "../models/book.model.js";

//קבלת כל הספרים
export const getAllBooks = async(req, res, next) => {
  try{
  const { page = 1, limit = 5 } = req.query;
  const result = await Book.find().skip((page - 1) * limit).limit(limit);
  res.json(result);
  }
  catch(error)
  {
    next({});
  }
  
};

//קבלת ספר לפי id
export const getBooksById = async(req, res, next) => {
  const {id}=req.params;
  try {
    if(!isValidObjectId(id)){
      return next({ status: 404, message: `book ${id} not found!` }); 
    }
    const b=await Book.findById(id);
    if(!b)
    {
      return next({ status: 404, message: `book ${id} not found!` });
    }
    res.json(b);
  } catch (error) {
    next({message:error.message});
  }
 
};

//קבלת ספר לפי שם
export const getBooksByName =async (req, res, next) => {
const {name}=req.params;
try {
  if(!name)
  {
   return res.status(400).json({ message: "Name parameter is required" });
  }
  const result=await Book.find({name:new RegExp(name,'i')});
  res.json(result);
  } catch (error) {
    next({});
  }
};

//הוספת ספר
export const addBook =async (req, res, next) => {
  const newBook=new Book({
    ...req.body
  });
  await newBook.save();
  res.json(newBook);
};

//שינוי פרטי ספר
export const updateBook = async(req, res, next) => {
  const{ id }=req.params;
   if(!isValidObjectId(id)){
      return res.status(400).json({ message: "Invalid ID" });
    }
  try {
    const b = await Book.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!b) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(b);
  } catch (error) {
    next(error);
  }
};

//ביצוע השאלה
export const borrowingBook =async (req, res, next) => {
  const {id,idCustomer}=req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  try {
    const b=await Book.findById(id);
    if(!b){
      return res.status(404).json({ message: `Book ${id} not found` });
    }
    if (b.isborrow) {
      return res.status(400).json({ message: "Book is already borrowed" });
    }
    b.isborrow = true;
    b.lendingArr.push({ date: new Date(), idCustomer });
    await b.save();
    res.json(b);
  }
  catch (error) {
    next(error);
  }
};

//ביצוע החזרה
export const returningBook = async(req, res, next) => {
  const {id}=req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  try {
   const b=await Book.findById(id);

    if(!b){
      return res.status(404).json({ message: `Book ${id} not found` });
    } 
    if (!b.isborrow) {
      return res.status(400).json({ message: "Book is not currently borrowed" });
    }
    b.isborrow = false;
    await b.save();
    res.json(b);
    } catch (error) {
    next(error);
  }
 };

//מחיקת ספר לפי id
export const deleteBook = async(req, res, next) => {
    const{ id }=req.params;
    if(!isValidObjectId(id)){
      return res.status(400).json({ message: "Invalid ID" });
    }
  try {
    const b=await Book.findByIdAndDelete(id);
    if (!b) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(b);
  } catch (error) {
    next(error);
  }
};
