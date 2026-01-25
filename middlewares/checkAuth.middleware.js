import jwt from 'jsonwebtoken';

export const auth=(req,res,next)=>{
    try {
        const { authorization='' }=req.headers;
        const [,token]=authorization.split(' ');
        const secretKey=process.env.JWT_SECRET??'secretKey123';
        const data=jwt.verify(token,secretKey);
        console.log(data);
        req.currentUser=data;
        next();
        } catch (error) {
         next({ status: 403, message: `Authentication failed` })
    }
};

export const isAdmin=(req,res,next)=>{
    if(req.currentUser.role==="admin")
        return next();
    return next({status:402,message:`Authorization failed (no permissions)`});
}