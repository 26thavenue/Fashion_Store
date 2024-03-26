const express = require("express");
const { updateUser, getAllUsers } = require("../controllers/user");
const  authMiddleware  = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

const userRouter = express.Router ();

userRouter.get('/',getAllUsers);
userRouter.put('/',authMiddleware, updateUser);

module.exports = userRouter;

