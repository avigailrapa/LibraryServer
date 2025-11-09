import userArr from "../user.js"; 

//login
export const login = (req, res, next) => {
  const { id, name, email, password } = req.body;
  if (!id || !name || !email || !password) {
    return next({ status: 400, message: "Missing required fields" });
  }

  const exists = userArr.some(u => u.email === email);
  if (exists) {
    return next({ status: 409, message: "Email already registered" });
  }

  const newUser = { id, name, email, password, borrowedBooks: [] };
  userArr.push(newUser);
  res.status(201).json({ message: "User registered successfully", user: newUser });
};

//getAllUsers
export const getAllUsers = (req, res, next) => {
  if (!userArr || userArr.length === 0) {
    return next({ status: 404, message: "No users found" });
  }
  res.json(userArr);
};

// signin 
export const signin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ status: 400, message: "Missing email or password" });
  }

  const user = userArr.find(u => u.email === email && u.password === password);
  if (!user) {
    return next({ status: 401, message: "Invalid email or password" });
  }

  res.status(200).json({ message: "Login successful", user });
};
