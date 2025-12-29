import Joi from 'joi';
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    phone: String
});

userSchema.pre('save',function(){
  const salt=bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});
export default model('User', userSchema);

export const validateUser = {
 login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
    // user register (username, email, password, repeat_password, phone)
    register: Joi.object({
        username: Joi.string().alphanum().trim().min(5).required(), // .trim() חיתוך רווחים
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password'),
        phone: Joi.string().pattern(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/).required(),
    })
};
