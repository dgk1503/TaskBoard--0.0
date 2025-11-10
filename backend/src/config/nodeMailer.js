import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: PROCESS.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Taskboard Account",
    html: `
           <h1>Welcome to Taskboard Sergeant !<h1/>
           <p>Your verification code is: <strong>${otp}</strong></p>
           <p>You have 10 minutes until this OTP Expires !</p>
        
        
        `,
  };
  return transporter.sendMail(mailOptions);
};

export default transporter;
