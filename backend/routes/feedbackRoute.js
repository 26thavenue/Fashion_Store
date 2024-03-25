const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } =  require("../middlewares/adminMiddleware");

const { createFeedback, getAllFeedbacks } = require("../controllers/feedback");

const feedbackRouter = express.Router();

feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/",  getAllFeedbacks);

module.exports = feedbackRouter;