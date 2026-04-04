import nodemailer from "nodemailer";

export const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const subject = "Email Verification - CareerStack";
  const message = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #000000;">CareerStack</h2>
      </div>
      <h3 style="color: #333333;">Email Verification</h3>
      <p style="color: #666666; font-size: 16px;">Your verification code is:</p>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0;">
        ${otp}
      </div>
      <p style="color: #666666; font-size: 14px;">This code will expire in 10 minutes.</p>
      <p style="color: #999999; font-size: 12px; margin-top: 30px;">If you didn't request this, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      <p style="color: #999999; font-size: 12px; text-align: center;">&copy; 2024 CareerStack. All rights reserved.</p>
    </div>
  `;

  const options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
};
