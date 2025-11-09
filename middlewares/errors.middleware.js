/**
 * error handling middleware
 * @param {{ status?: number, message?: string }} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */

export const errorsHandler = (err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message ?? "server error";
  res.status(status).json({ error: message, type: "server error" });
};


export const notFound=(req,res,next)=>{
    res.status(404).json({ error: "not found", type: "client error" })    
};
    