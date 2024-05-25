//setup nodemailer
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createApproval } from "./approvalService.js";
import * as approvalService from "../services/approvalService.js";
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
  const resetPasswordUrl = `http://localhost:5173/reset-password?token=${token.token}`;
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

export const sendMultipleEmails = async ({
  participant,
  userId,
  appointmentId,
  subject,
  text,
}) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIN_EMAIL,
      to: participant.label,
      subject: subject,
      text: text,
    });
    await approvalService.createApproval({
      recipient: participant.value,
      creator: userId,
      relatedAppointmentId: appointmentId,
    });
  } catch (error) {
    console.error(`Error sending email to ${participant}:`, error);
  }
};
export const sendMultipleEmailsEdit = async ({
  participant,
  userId,
  appointmentId,
  subject,
  text,
}) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIN_EMAIL,
      to: participant.label,
      subject: subject,
      text: text,
    });
    await approvalService.createApproval({
      recipient: participant.value,
      creator: userId,
      relatedAppointmentId: appointmentId,
    });
  } catch (error) {
    console.error(`Error sending email to ${participant}:`, error);
  }
};
