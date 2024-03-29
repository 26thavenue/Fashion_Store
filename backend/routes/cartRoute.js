const express = require("express");
const  authMiddleware  = require("../middlewares/authMiddleware");

const { addItemToCart,getACartItem,getUserCart,deleteAllUserCart, deleteItemFromCart, changeQuantity } = require("../controllers/cart");

const cartRouter = express.Router();

cartRouter.post("/",[authMiddleware], addItemToCart);
cartRouter.get("/",[authMiddleware], getUserCart);
cartRouter.get("/:id",  getACartItem);
cartRouter.delete("/:id",[authMiddleware],  deleteItemFromCart);
cartRouter.delete("/",[authMiddleware],  deleteAllUserCart);
cartRouter.put("/:id",  changeQuantity);

module.exports = cartRouter;