import nodemailer from "nodemailer";

/**
 * Configure Nodemailer Transporter using environment variables
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send password reset email with a 6-digit OTP code and a direct link
 */
export async function sendPasswordResetEmail({ to, name, resetCode, resetToken }) {
  const appUrl = process.env.NEXTAUTH_URL || process.env.APP_URL || "http://localhost:3000";
  const resetLink = `${appUrl}/reset-password?code=${resetCode}&token=${resetToken || ""}&email=${encodeURIComponent(to)}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fbf9f5; margin: 0; padding: 20px; color: #2d3748; }
        .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #f7f4ed 0%, #e9ede4 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid #e2e8f0; }
        .header h1 { font-family: 'Playfair Display', Georgia, serif; color: #2d4a22; margin: 8px 0 0 0; font-size: 26px; }
        .header p { color: #718096; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; margin: 4px 0 0 0; }
        .content { padding: 32px 28px; line-height: 1.6; }
        .code-box { background: #f4f7f2; border: 2px dashed #4a6b35; border-radius: 14px; padding: 18px; text-align: center; margin: 24px 0; }
        .code { font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #2d4a22; }
        .button { display: inline-block; background-color: #2d4a22; color: #ffffff !important; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 10px; }
        .footer { background: #fafafa; padding: 20px 24px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Crochet Alif</h1>
          <p>Handmade with Love</p>
        </div>
        <div class="content">
          <p>Hello <strong>${name || "Patron"}</strong>,</p>
          <p>We received a request to reset the password for your Crochet Alif account. Use the 6-digit verification code below:</p>
          
          <div class="code-box">
            <div style="font-size: 11px; color: #687e5b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Verification Code (Valid for 15 mins)</div>
            <div class="code">${resetCode}</div>
          </div>

          <p style="text-align: center; margin: 24px 0 16px 0;">
            <a href="${resetLink}" class="button">Reset Password Directly</a>
          </p>

          <p style="font-size: 13px; color: #718096; margin-top: 24px;">If you did not make this request, you can safely ignore this email. Your password will remain unchanged.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Crochet Alif. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  return await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Crochet Alif" <${process.env.SMTP_USER}>`,
    to,
    subject: `Your Password Reset Code: ${resetCode} — Crochet Alif`,
    text: `Hello ${name || "Patron"},\n\nYour 6-digit verification code to reset your password is: ${resetCode}\n\nAlternatively, click this link: ${resetLink}\n\nThis code expires in 15 minutes.\n\nCrochet Alif Team`,
    html: htmlContent,
  });
}

/**
 * Send Welcome Email to newly registered customers
 */
export async function sendWelcomeEmail({ to, name }) {
  const appUrl = process.env.NEXTAUTH_URL || process.env.APP_URL || "http://localhost:3000";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fbf9f5; margin: 0; padding: 20px; color: #2d3748; }
        .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #f7f4ed 0%, #e9ede4 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid #e2e8f0; }
        .header h1 { font-family: 'Playfair Display', Georgia, serif; color: #2d4a22; margin: 8px 0 0 0; font-size: 26px; }
        .header p { color: #718096; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; margin: 4px 0 0 0; }
        .content { padding: 32px 28px; line-height: 1.6; }
        .points-badge { background: #fdf6ec; border: 1px solid #f9d8a6; color: #b7791f; font-weight: bold; border-radius: 12px; padding: 12px; text-align: center; margin: 20px 0; }
        .button { display: inline-block; background-color: #2d4a22; color: #ffffff !important; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 10px; }
        .footer { background: #fafafa; padding: 20px 24px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Crochet Alif</h1>
          <p>Handmade with Love</p>
        </div>
        <div class="content">
          <p>Welcome to our family, <strong>${name}</strong>! 🌸</p>
          <p>Thank you for joining Crochet Alif. We are thrilled to share our handcrafted crochet creations with you.</p>
          
          <div class="points-badge">
            🎁 100 Stitch Points Welcome Bonus Credited!
          </div>

          <p>Explore our latest handcrafted collection of tote bags, home decor, and bespoke crochet art.</p>
          
          <p style="text-align: center; margin: 28px 0 10px 0;">
            <a href="${appUrl}/collection" class="button">Explore Collection</a>
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Crochet Alif. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  return await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Crochet Alif" <${process.env.SMTP_USER}>`,
    to,
    subject: "Welcome to Crochet Alif! 🌸 + 100 Stitch Points Bonus",
    html: htmlContent,
  });
}
