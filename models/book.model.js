import Joi from 'joi';

export const bookSchemas = {
  borrowBook: Joi.object({
    id: Joi.number().integer().required(),
    idCustomer: Joi.number().required()  
  })
};
