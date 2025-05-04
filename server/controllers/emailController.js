const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (req, res) => {
  const { customerEmail, adminEmail, customerSubject, adminSubject, customerText, adminText } = req.body;

  // ולידציה בסיסית
  if (!customerEmail || !adminEmail || !customerSubject || !adminSubject || !customerText || !adminText) {
    return res.status(400).json({ error: "Missing required email fields" });
  }

  // בדיקת תקינות מייל
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customerEmail) || !emailRegex.test(adminEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // מגבלת אורך
  if (customerText.length > 1000 || adminText.length > 1000) {
    return res.status(400).json({ error: "Message too long" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: adminSubject,
      text: adminText,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: customerSubject,
      text: customerText,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendEmail };
