import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { getImageKitInstance } from "@/lib/imagekit";

async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}

/**
 * GET /api/admin/products - List all products for admin
 */
export async function GET(req) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Admin GET Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/**
 * POST /api/admin/products - Create new product with ImageKit images
 */
export async function POST(req) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      price,
      originalPrice,
      category,
      categorySlug,
      description,
      images,
      details,
      yarnMaterial,
      craftingDays,
      colors,
      badge,
      badgeColor,
      stockCount,
      inStock,
      isFeatured,
      isActive,
    } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Name, price, and category are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const existing = await Product.findOne({ slug: normalizedSlug });
    if (existing) {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 409 }
      );
    }

    const newProduct = await Product.create({
      name: name.trim(),
      slug: normalizedSlug,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: category.trim(),
      categorySlug: categorySlug || "bags",
      description: description || "",
      images: images && images.length > 0 ? images : ["/images/Granny_Sweater.png"],
      details: Array.isArray(details) ? details : ["100% premium combed cotton yarn"],
      yarnMaterial: yarnMaterial || "100% Premium Cotton",
      craftingDays: craftingDays ? Number(craftingDays) : 4,
      colors: Array.isArray(colors) && colors.length > 0 ? colors : ["#3D5938"],
      badge: badge || null,
      badgeColor: badgeColor || "bg-amber-500",
      stockCount: stockCount !== undefined ? Number(stockCount) : 10,
      inStock: inStock !== undefined ? inStock : true,
      isFeatured: !!isFeatured,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Admin Create Product Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/products - Update product
 */
export async function PUT(req) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    if (updateData.slug) {
      updateData.slug = updateData.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    if (updateData.price !== undefined) updateData.price = Number(updateData.price);
    if (updateData.originalPrice !== undefined) {
      updateData.originalPrice = updateData.originalPrice ? Number(updateData.originalPrice) : null;
    }
    if (updateData.stockCount !== undefined) {
      updateData.stockCount = Number(updateData.stockCount);
      updateData.inStock = updateData.stockCount > 0;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Admin Update Product Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/products - Permanently remove product
 */
export async function DELETE(req) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID parameter required" }, { status: 400 });
    }

    await connectToDatabase();
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    console.error("Admin Delete Product Error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
