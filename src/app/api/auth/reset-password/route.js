import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { code, token, email, password } = await req.json();

    if ((!code && !token) || !password) {
      return NextResponse.json(
        { error: "Verification code/token and new password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Query for active non-expired reset token
    let query = {
      resetPasswordExpires: { $gt: new Date() },
    };

    if (email) {
      query.email = email.toLowerCase().trim();
    }

    const users = await User.find(query).select("+password");

    // Find the matching user either by 6-digit code or by raw token
    const user = users.find((u) => {
      if (!u.resetPasswordToken) return false;
      const [storedCode, storedToken] = u.resetPasswordToken.split(":");
      if (code && storedCode === code.trim()) return true;
      if (token && storedToken === token.trim()) return true;
      return false;
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification code. Please request a new one." },
        { status: 400 }
      );
    }

    // Update password and clear reset tokens
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    if (user.authProvider === "google") {
      user.authProvider = "both";
    }
    await user.save();

    return NextResponse.json({
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
