import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";

/**
 * Middleware verification helper for Admin role
 */
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "admin") {
    return false;
  }
  return true;
}

/**
 * GET all categories (active & inactive) for Admin panel
 */
export async function GET() {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    await connectToDatabase();
    const categories = await Category.find().sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Admin GET Categories Error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

/**
 * POST /api/admin/categories - Create new Category
 */
export async function POST(req) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    const body = await req.json();
    const { name, slug, description, image, icon, displayOrder, isActive } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Category name and slug are required." }, { status: 400 });
    }

    await connectToDatabase();

    const normalizedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    const existing = await Category.findOne({ slug: normalizedSlug });

    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 });
    }

    const newCategory = await Category.create({
      name: name.trim(),
      slug: normalizedSlug,
      description: description || "",
      image: image || "/images/Bags_&_Pouches.png",
      icon: icon || "BsBag",
      displayOrder: displayOrder ? Number(displayOrder) : 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Admin Create Category Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create category." }, { status: 500 });
  }
}

/**
 * PUT /api/admin/categories - Update an existing Category
 */
export async function PUT(req) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    const body = await req.json();
    const { id, name, slug, description, image, icon, displayOrder, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    const updateFields = {};
    if (name) updateFields.name = name.trim();
    if (slug) updateFields.slug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    if (description !== undefined) updateFields.description = description;
    if (image) updateFields.image = image;
    if (icon) updateFields.icon = icon;
    if (displayOrder !== undefined) updateFields.displayOrder = Number(displayOrder);
    if (isActive !== undefined) updateFields.isActive = isActive;

    const updated = await Category.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Admin Update Category Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update category." }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/categories - Soft delete or remove category
 */
export async function DELETE(req) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID parameter required." }, { status: 400 });
    }

    // Delete category document permanently from database
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    console.error("Admin Delete Category Error:", error);
    return NextResponse.json({ error: "Failed to delete category." }, { status: 500 });
  }
}
