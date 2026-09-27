import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";

export const DEFAULT_CATEGORIES = [
  {
    name: "Bags & Pouches",
    slug: "bags",
    description: "Beautiful handcrafted bags and pouches tailored for style and daily charm.",
    image: "/images/Bags_&_Pouches.png",
    icon: "BsBag",
    displayOrder: 1,
    isActive: true,
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    description: "Add handmade warmth and aesthetic comfort to your living spaces.",
    image: "/images/Home_Decor.png",
    icon: "BsHouseDoor",
    displayOrder: 2,
    isActive: true,
  },
  {
    name: "Handkerchiefs",
    slug: "handkerchiefs",
    description: "Delicate, soft, and practical handcrafted crochet handkerchiefs.",
    image: "/images/Handkerchiefs.png",
    icon: "BsScissors",
    displayOrder: 3,
    isActive: true,
  },
  {
    name: "Wall Hangings",
    slug: "wall-hangings",
    description: "Transform your walls with bespoke macrame and crochet tapestries.",
    image: "/images/Wall_Hangings_collections.png",
    icon: "BsImage",
    displayOrder: 4,
    isActive: true,
  },
  {
    name: "Soft Toys",
    slug: "soft-toys",
    description: "Adorable, safe, and huggable crochet plushies & amigurumi creations.",
    image: "/images/Soft_Toys.png",
    icon: "BsHeart",
    displayOrder: 5,
    isActive: true,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Complete your look with handcrafted wallets, keychains, and scrunchies.",
    image: "/images/Accessories.png",
    icon: "BsScissors",
    displayOrder: 6,
    isActive: true,
  },
];

/**
 * Seed initial categories if none exist in the database
 */
export async function seedCategories() {
  await connectToDatabase();
  const count = await Category.countDocuments();
  if (count === 0) {
    await Category.insertMany(DEFAULT_CATEGORIES);
    console.log("✅ Seeded initial handcrafted categories into MongoDB.");
  }
}
