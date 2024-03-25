const express = require("express");
const authMiddleware  = require("../middlewares/authMiddleware");
const  adminMiddleware  = require("../middlewares/adminMiddleware");

const { createOrder, getAllUserOrders, deleteOrder } = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.post("/", [authMiddleware], createOrder);
orderRouter.get("/", [authMiddleware],getAllUserOrders);
orderRouter.delete("/:id",  deleteOrder);

module.exports = orderRouter;