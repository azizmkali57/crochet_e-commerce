import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: { type: String, required: true },
  slug: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, default: 1 },
  image: { type: String },
  selectedColor: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Nullable for guest checkouts
    },
    items: [OrderItemSchema],
    // Customer Contact
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    // Delivery Address
    shippingAddress: {
      street: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    // Shipping Specs
    shippingMethod: {
      type: String,
      enum: ["standard", "express"],
      default: "standard",
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    // Financials
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: String,
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    // Payment Details
    paymentMethod: {
      type: String,
      enum: ["upi", "cod", "whatsapp", "card"],
      default: "upi",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    // Handcrafted Crafting & Dispatch Timeline
    craftingStatus: {
      type: String,
      enum: [
        "Order Received",
        "Yarn Selection",
        "In Stitching & Crafting",
        "Quality Inspected",
        "Ready for Dispatch",
        "Delivered with Love",
        "Cancelled",
      ],
      default: "Order Received",
    },
    craftingProgress: {
      type: Number,
      default: 10, // 0 - 100%
      min: 0,
      max: 100,
    },
    // Gifting
    isGift: {
      type: Boolean,
      default: false,
    },
    giftNote: {
      type: String,
      default: "",
    },
    trackingNumber: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate order number if missing
OrderSchema.pre("validate", function (next) {
  if (!this.orderNumber) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    this.orderNumber = `CAL-${randomDigits}`;
  }
  next();
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
