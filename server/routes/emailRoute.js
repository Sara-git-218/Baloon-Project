const express = require("express");
const emailController = require("../controllers/emailController");

const router = express.Router();

router.post("/send-email",emailController.sendEmail );
router.post("/send-email-user", emailController.sendEmailToUser);
module.exports = router;
