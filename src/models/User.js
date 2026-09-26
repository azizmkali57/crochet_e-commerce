import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      select: false, // Hidden by default on queries
    },
    authProvider: {
      type: String,
      enum: ["credentials", "google", "both"],
      default: "credentials",
    },
    googleId: {
      type: String,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "artisan"],
      default: "customer",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "/images/main_logo.png",
    },
    bio: {
      type: String,
      default: "Crochet art enthusiast & patron.",
    },
    // Stitch Loyalty Rewards Program
    stitchPoints: {
      type: Number,
      default: 100, // Welcome bonus
    },
    tier: {
      type: String,
      enum: ["New Patron", "Regular Collector", "Artisan Patron", "VIP Member"],
      default: "New Patron",
    },
    // Saved Delivery Addresses
    addresses: [
      {
        tag: { type: String, default: "Home" }, // Home / Studio / Work
        isDefault: { type: Boolean, default: false },
        recipient: { type: String, required: true },
        phone: { type: String, required: true },
        street: { type: String, required: true },
        apartment: { type: String, default: "" },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
      },
    ],
    // Wishlist References
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    // Password reset token fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
