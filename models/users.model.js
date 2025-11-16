import Joi from 'joi';

export const userSchemas = {
 
  login: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
  }),

  signin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
  })

};
