import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  
  origin: [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://abhimak4.net",
  "https://www.abhimak4.net"
]
  
}));

app.use(express.json());

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    const adminEmail = await resend.emails.send({
      from: "Abhishek Makwana <noreply@abhimak4.net>",
      to: ["abhi.mak4@gmail.com"],
      subject: `New portfolio enquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    const autoReply = await resend.emails.send({
      from: "Abhishek Makwana <noreply@yourdomain.com>",
      to: [email],
      subject: "Thanks for contacting me",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I received your message and will get back to you soon.</p>
        <p>Best regards,<br/>Abhishek Makwana</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
      adminEmail,
      autoReply
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message."
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});