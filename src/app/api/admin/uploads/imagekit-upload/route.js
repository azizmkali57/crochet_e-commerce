import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getImageKitInstance } from "@/lib/imagekit";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName") || `crochet-${Date.now()}`;
    const folder = formData.get("folder") || "/crochet-alif/products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imagekit = getImageKitInstance();
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: fileName.toString(),
      folder: folder.toString(),
      useUniqueFileName: true,
      tags: ["crochet-product"],
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
      thumbnailUrl: uploadResponse.thumbnailUrl,
    });
  } catch (error) {
    console.error("Direct ImageKit Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image to ImageKit" },
      { status: 500 }
    );
  }
}
