import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

// 1. Create a transporter object using an SMTP transport
// Example using Gmail (requires an App Password)
const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
            // Get these from environment variables for production
            user: process.env.NODEMAILER_EMAIL_USERNAME, // Your email address
            pass: process.env.NODEMAILER_EMAIL_PASSWORD, // Your generated App Password
      },
      // You can also use other SMTP options:
      // host: 'smtp.example.com',
      // port: 587,
      // secure: false, // true for 465, false for other ports
});

// Optionally, verify the connection (good for debugging)
transporter.verify(function (error, success) {
      if (error) {
            console.error("Transporter verification failed:", error);
      } else {
            console.log("Server is ready to take our messages");
      }
});

// 3. Send the email
export async function sendVerificationEmail(toEmail, verificationToken) {
      try {
            let info = await transporter.sendMail({
                  from: "Kazafi <onboarding@kazafi.com>", // MUST be a domain you've verified with Resend
                  to: [toEmail],
                  subject: "Verify Your Email Address",
                  html: `
                  <div style="font-family:sans-serif; text-align:center; padding: 20px;">
                        <h1 style="margin-bottom: 20px;">Hi there 👋</h1>
                        <p style="margin-bottom: 20px;">Thank you for registering! Please click the link below to verify your email address and activate your account:</p>
                        <a href="http://localhost:5000/api/users/verify?token=${verificationToken}" target="_blank" style="padding: 10px 20px; background-color:blue; color: white; text-decoration: none; border-radius: 5px;">Verify Account</a>
                        <p style="margin-bottom: 40px; color: gray;">This link will expire in 24 hours.</p>
                        <p style="margin-bottom: 10px;">If you did not request this, please ignore this email.</p>
                  </div>
            `, // HTML body content
                  // You can also add attachments:
                  // attachments: [{
                  //   filename: 'invoice.pdf',
                  //   path: '/path/to/invoice.pdf'
                  // }]
            });
            console.log("Message sent: %s", info.messageId);
            // Preview URL only available with Ethereal/Test accounts
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      } catch (error) {
            console.error("Error sending email:", error);
      }
}
