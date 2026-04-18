import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://abhishek-portfolio-pearl-five.vercel.app",
      "https://abhimak4.net",
      "https://www.abhimak4.net"
    ];

    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith("-abhimak4s-projects.vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use("/contact", contactLimiter);

app.post("/contact", async (req, res) => {
  const { name, email, message, company } = req.body;

  // Honeypot field for spam bots
  if (company) {
    return res.status(200).json({
      success: true,
      message: "Ignored"
    });
  }

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  if (message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: "Message is too short."
    });
  }

  try {
    const adminEmail = await resend.emails.send({
      from: "Portfolio Contact <noreply@abhimak4.net>",
      to: ["abhi.mak4@gmail.com"],
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    const autoReply = await resend.emails.send({
      from: "Abhishek Makwana <noreply@abhimak4.net>",
      to: [email],
      subject: "Thanks for contacting me",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I received your message and will get back to you soon.</p>
        <p>Best regards,<br/>Abhishek Makwana</p>
      `
    });

    console.log("Admin email:", adminEmail);
    console.log("Auto reply:", autoReply);

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error("Resend error:", error);

    res.status(500).json({
      success: false,
      message: "Email failed",
      error: error?.message || "Unknown error"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});