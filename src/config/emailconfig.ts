import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configuração do transporte de email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor SMTP (use o do seu provedor)
  port: 587, // Porta SMTP (587 é para STARTTLS, 465 é para SSL)
  secure: false, // false para STARTTLS, true para SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
