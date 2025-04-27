const nodemailer = require("nodemailer");
require("dotenv").config(); // כדי להשתמש בקובץ .env

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, // כתובת המייל מה-ENV
    pass: process.env.EMAIL_PASS, // סיסמת אפליקציה מה-ENV
  },
});

// פונקציה ששולחת מייל
const sendEmail = async (req, res) => {
  // const { to, subject, text } = req.body;
  const { customerEmail, adminEmail, customerSubject, adminSubject, customerText, adminText } = req.body;



  // if (!to || !subject || !text) {
  //   return res.status(400).json({ error: "Missing email parameters" });
  // }

  try {
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to,
    //   subject,
    //   text,
    // });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
     to: adminEmail,
     subject: adminSubject,
      text:adminText,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to:customerEmail,
      subject:customerSubject,
     text: customerText,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) 
  {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendEmail };
