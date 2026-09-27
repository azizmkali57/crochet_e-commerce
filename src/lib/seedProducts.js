import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { PRODUCTS_DATA } from "../../lib/productData";

export async function seedProducts() {
  await connectToDatabase();

  const count = await Product.countDocuments();
  if (count > 0) return;

  const categories = await Category.find().lean();
  const categoryMap = {};
  categories.forEach((c) => {
    categoryMap[c.slug] = c.name;
  });

  const productsToInsert = Object.values(PRODUCTS_DATA).map((item) => {
    // Derive category from item
    let catName = "Bags & Pouches";
    let catSlug = "bags";

    if (item.slug.includes("sheep") || item.slug.includes("toy")) {
      catName = "Soft Toys";
      catSlug = "soft-toys";
    } else if (item.slug.includes("wall-hanging") || item.slug.includes("dreamcatcher")) {
      catName = "Wall Hangings";
      catSlug = "wall-hangings";
    } else if (item.slug.includes("wallet") || item.slug.includes("accessory")) {
      catName = "Accessories";
      catSlug = "accessories";
    } else if (item.slug.includes("sweater")) {
      catName = "Wearables";
      catSlug = "wearables";
    }

    return {
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice || null,
      category: catName,
      categorySlug: catSlug,
      description: item.description,
      images: item.images || ["/images/Granny_Sweater.png"],
      details: item.details || [
        "100% premium combed cotton yarn",
        "Hand-crocheted by master artisans",
        "Takes 3-5 crafting days to weave",
      ],
      yarnMaterial: "100% Premium Cotton",
      craftingDays: 4,
      colors: item.colors || ["#3D5938", "#B5C5A8", "#E8EDE0"],
      badge: item.badge || null,
      badgeColor: item.badgeColor || "bg-amber-500",
      rating: item.rating || 5.0,
      reviewsCount: item.reviews || 0,
      inStock: true,
      stockCount: 12,
      isFeatured: !!item.badge,
      isActive: true,
    };
  });

  await Product.insertMany(productsToInsert);
  console.log(`✅ Seeded ${productsToInsert.length} initial products into MongoDB.`);
}
