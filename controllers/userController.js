const User = require("../models/user");
const { catchAsync } = require("../middleware/errorWithAsync");

// Get all users
const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get user by ID
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// Create new user
const createUser = catchAsync(async (req, res, next) => {
  
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
});

// Update user
const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// Delete user
const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: "User deleted successfully" });
});
   
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
