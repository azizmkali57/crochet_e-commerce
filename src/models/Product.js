import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    categorySlug: {
      type: String,
      index: true,
      default: "bags",
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    // Craftsmanship Details
    details: {
      type: [String],
      default: [
        "100% premium combed cotton yarn",
        "Hand-crocheted by master artisans",
        "Takes 3-5 crafting days to weave",
      ],
    },
    yarnMaterial: {
      type: String,
      default: "100% Premium Cotton",
    },
    craftingDays: {
      type: Number,
      default: 4,
    },
    colors: {
      type: [String],
      default: ["#3D5938", "#B5C5A8", "#E8EDE0"],
    },
    badge: {
      type: String,
      default: null,
    },
    badgeColor: {
      type: String,
      default: "bg-amber-500",
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 10,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
