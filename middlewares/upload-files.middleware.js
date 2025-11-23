 import { error } from "console";
import multer from "multer";
 import path from 'path';

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];
    if(!allowedExt.includes(fileExtension))
    {
        return cb(new error("you didnt send a pic"));
    }
    const bookId=req.body.bookId;
    cb(null, `product${bookId}${Date.now()}`);
  }
})

export const upload = multer({ storage: storage,limits:{fileSize:1*1024*1024} });
