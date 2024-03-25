const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

const { createContact, getAllContactDetails } = require("../controllers/contact");

const contactRouter = express.Router();

contactRouter.post("/", createContact);
contactRouter.get("/",  getAllContactDetails);

module.exports = contactRouter;