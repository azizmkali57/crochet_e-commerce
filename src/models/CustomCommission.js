import mongoose from "mongoose";

const CustomCommissionSchema = new mongoose.Schema(
  {
    commissionId: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Handbags & Pouches",
        "Cardigans & Sweaters",
        "Amigurumi & Soft Toys",
        "Home Decor & Tapestry",
        "Other Bespoke Art",
      ],
    },
    yarnMaterial: {
      type: String,
      default: "100% Premium Cotton",
    },
    colorPalette: {
      type: String,
      default: "Sage Meadow",
    },
    customColors: [String],
    dimensions: {
      type: String,
      default: "Standard",
    },
    budget: {
      type: String,
      default: "₹1,500 - ₹3,000",
    },
    inspirationNotes: {
      type: String,
      default: "",
    },
    referenceImages: [String],
    status: {
      type: String,
      enum: [
        "Inquiry Received",
        "Artisan Reviewing Spec",
        "Quotation Approved",
        "In Crafting Phase",
        "Completed & Shipped",
        "Cancelled",
      ],
      default: "Inquiry Received",
    },
    estimatedDays: {
      type: String,
      default: "6-8 crafting days",
    },
    quotedPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CustomCommissionSchema.pre("validate", function (next) {
  if (!this.commissionId) {
    const randomDigits = Math.floor(100 + Math.random() * 900);
    this.commissionId = `CUST-${randomDigits}`;
  }
  next();
});

export default mongoose.models.CustomCommission ||
  mongoose.model("CustomCommission", CustomCommissionSchema);
