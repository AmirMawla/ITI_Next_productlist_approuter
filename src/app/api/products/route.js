import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    const formatted = products.map((p) => p.toJSON());
    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
