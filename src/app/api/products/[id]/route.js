import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const productObj = await Product.findById(id);

    if (!productObj) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(productObj.toJSON(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
