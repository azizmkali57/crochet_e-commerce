import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
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

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const isAdminEmail = normalizedEmail === process.env.ADMIN_EMAIL?.toLowerCase().trim();

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone?.trim() || "",
      authProvider: "credentials",
      role: isAdminEmail ? "admin" : "customer",
      stitchPoints: isAdminEmail ? 9999 : 100,
      tier: isAdminEmail ? "VIP Member" : "New Patron",
      avatar: "/images/main_logo.png",
      isActive: true,
      isEmailVerified: false,
      lastLogin: new Date(),
    });

    return NextResponse.json(
      {
        message: "Account created successfully! Welcome bonus of 100 Stitch Points awarded.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          stitchPoints: newUser.stitchPoints,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
