import Joi from 'joi';
import{ model, Schema, SchemaType } from "mongoose";

const bookSchema=new Schema({
  name:String,
  price:Number,
  categories:[String],
  isborrow: { type: Boolean, default: false },
  lendingArr: { type: [{ date: Date, idCustomer: Schema.Types.ObjectId }], default: [] },
  author:{
    _id:Schema.Types.ObjectId,
    name:String,
    phone:String,
    email:String,
  }
});

export default model('Book',bookSchema);

export const bookSchemas = {
  borrowBook: Joi.object({
    id: Joi.number().integer().required(),
    idCustomer: Joi.number().required()  
  })
};
