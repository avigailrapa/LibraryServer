import User from "../models/users.model.js"
//login
export const login = async(req, res, next) => {
 try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user|| !user.comparePasswords(password)){
        return next({status:400,message:`email/passwors invalid`});
    }
    return res.json(user);         
 } catch (error) {
    next({message:error.message});   
 }

};

//getAllUsers
export const getAllUsers = async(req, res, next) => {
    try{
    const { page = 1, limit = 5 } = req.query;
    const users = await User.find().skip((page - 1) * limit).limit(limit);
    res.json(users);
    }
    catch(error)
    {
      next(error);
    }
};

// register 
export const register = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        next({ status: 409, message: error.message });
    }
};