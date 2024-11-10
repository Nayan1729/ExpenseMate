import { response } from "express";
import nodemailer from "nodemailer";

const sendEmail = async (receiverEmail, subject, text) => {
 
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,                    
  secure: false,                // false for 587, true for 465
  auth: {
      user: process.env.BREVEO_EMAIL, 
      pass: process.env.BREVEO_PASSWORD 
  }
});

  const mailOptions = {
    from: `"ExpenseMate" ${process.env.GMAIL_EMAIL}`,  
    to: receiverEmail,  
    subject: subject,   
    text: text,        
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.log("Error sending email: ", error.message);
    return { success: false, response: error.message };
  }
};

export default sendEmail;
