import dotenv from "dotenv";
import { Resend } from "resend";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
// 3. Send the email
export async function sendVerificationEmail(toEmail, verificationToken) {
      const { data, error } = await resend.emails.send({
            from: "Kazafi <onboarding@resend.dev>",
            to: [toEmail],
            subject: "Verify Your Email Address",
            html: `
                  <div style="font-family:sans-serif; text-align:center; padding: 20px;">
                        <h1 style="margin-bottom: 20px;">Hi there 👋</h1>
                        <p style="margin-bottom: 20px; font-size:18px">Thank you for registering! Please click the link below to verify your email address and activate your account:${toEmail}</p>
                        <a href="https://kazafi.onrender.com/api/users/verify?token=${verificationToken}" target="_blank" style="padding: 10px 20px; background-color:blue; color: white; text-decoration: none; border-radius: 5px;">Verify Account</a>
                        <p style="margin-top:20px; margin-bottom: 5px; color: gray; font-size:18px;">This link will expire in 24 hours.</p>
                        <p style="margin-bottom: 10px;">If you did not request this, please ignore this email.</p>
                  </div>
            `,
      });

      if (error) {
            console.log("resend email error: ", error);
      }

      console.log("verification email sent :", { data });
}

export async function sendOrderStatus(order) {
      const { data, error } = await resend.emails.send({
            from: "Kazafi <onboarding@resend.dev>",
            to: [order.customer.email],
            subject: "Order Update",
            html: `
                  <div style="font-family:sans-serif; text-align:center; padding: 20px;">
                        <h1 style="margin-bottom: 20px;">Hi there 👋</h1>
                        <p style="margin-bottom: 20px;">Your order PO-${order._id} ${order.status !== "delivered" ? "is" : "has been"} ${order.status}</p>
                        
                        <p style="margin-bottom: 10px;">For any further question, all our customer service @ 040900005998093</p>
                  </div>
            `,
      });

      if (error) {
            console.log("resend email error: ", error);
      }

      console.log("order status update email sent :", { data });
}
