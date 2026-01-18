import Joi from 'joi';
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role:{type:String,enums:['admin','user'],required:true}
});

userSchema.pre('save',function(){
  const salt=bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

userSchema.method('comparePasswords',function(newPassword){
    const isEqual=bcrypt.compareSync(newPassword,this.password)
    return isEqual;
});

userSchema.set('toJSON',{
    virtuals:true,
    transform(doc,converted){
        delete converted.password;
        delete converted._id;
        delete converted.__v;

    }
})
export default model('User', userSchema);


export const validateUser = {
 login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
    // user register (username, email, password, repeat_password, phone)
    register: Joi.object({
        username: Joi.string().alphanum().trim().min(5).required(), 
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password'),
        phone: Joi.string().pattern(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/).required(),
    })
};
