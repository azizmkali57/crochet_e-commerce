import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    // Always respond with success to prevent user enumeration attacks
    if (!user) {
      return NextResponse.json({
        message: "If an account exists with this email, password reset instructions have been sent.",
      });
    }

    // Generate 6-digit verification code and raw token
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Token expires in 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Store in user record (code or token for verification)
    user.resetPasswordToken = `${resetCode}:${resetToken}`;
    user.resetPasswordExpires = expiresAt;
    await user.save();

    // Send email using SMTP
    try {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetCode,
        resetToken,
      });
    } catch (mailErr) {
      console.error("Failed to send reset email via SMTP:", mailErr);
      return NextResponse.json(
        { error: "Failed to send reset email. Please verify SMTP configuration or try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "If an account exists with this email, password reset instructions have been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
