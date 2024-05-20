//setup nodemailer
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIN_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  const resetPasswordUrl = `https://hora-goy3.onrender.com/reset-password?token=${token.token}`;
  const text = `Dear user,
    To reset your password, click on this link: ${resetPasswordUrl}
    If you did not request any password resets, then ignore this email.`;

  await transporter.sendMail({
    from: process.env.MAIN_EMAIL,
    to: to,
    subject: subject,
    text: text,
  });
};
