import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { seedCategories } from "@/lib/seedCategories";

export async function GET() {
  try {
    await connectToDatabase();
    await seedCategories();

    // Fetch active categories sorted by displayOrder
    const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 }).lean();

    // Calculate product counts per category (or default 0)
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        // Match either by category slug or category name in products
        const count = await Product.countDocuments({
          $or: [
            { category: cat.name },
            { category: cat.slug },
          ],
        });

        return {
          id: cat._id.toString(),
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          image: cat.image,
          icon: cat.icon,
          displayOrder: cat.displayOrder,
          productCount: count,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    console.error("Categories API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories." },
      { status: 500 }
    );
  }
}
