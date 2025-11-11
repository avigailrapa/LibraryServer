/**
 * error handling middleware
 * @param {{ status?: number, message?: string }} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */

export const errorsHandler = (err, req, res, next) => {
  const status = err.status ?? 500;
  const { message = 'Server Error!' } = err;
  res.status(status).json({ error:{ massage: message}});
};


export const notFound=(req,res,next)=>{
   next({status:404,message:`Route ${req.originalUrl} Not Found`})  
};
    
