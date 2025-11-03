
import { Router } from "express";
import userArr from "../user.js"; 
const userRouter = Router();


userRouter.post('/users', (req, res) => {
  const { id, name, email, password } = req.body;
  if (!id || !name || !email || !password) {
    return res.status(400).send("Missing required fields");
  }
  const exists = userArr.some(u => u.email === email);
  if (exists) {
    return res.status(409).send("Email already registered");
  }
  const newUser = { id, name, email, password, borrowedBooks: [] };
  userArr.push(newUser);
  res.status(201).json({ message: "User registered successfully", user: newUser });

});

userRouter.get('./',(req,res)=>{
    if(!userArr||userArr.length==0)
        return res.status(404).send("No user")
    res.json(userArr)
}
)

userRouter.post('/users/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Missing email or password");
    }   
    const user = userArr.find(u => u.email === email && u.password == password);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }  
    res.status(200).json({ message: "Login successful", user });
});

export default userRouter;


