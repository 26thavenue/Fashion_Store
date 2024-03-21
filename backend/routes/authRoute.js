const express = require("express");
const {login,signUp,me} = require('../controllers/auth')
// const { authMiddleware } = require("../middlewares/authMiddleware")

const authRouter = express.Router();

authRouter.post("/login", login );
authRouter.post("/register", signUp );
// authRouter.get("/me",[authMiddleware], me );


module.exports = authRouter;