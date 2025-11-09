export const addDate=(req,res,next)=>{
    req.currentDate=new Date();
    next();    
};

export const addDateForGet=(req,res,next)=>{
    if(req.method==="GET")  
       console.log(`Date of GET request: ${req.currentDate}`);
    next();
};