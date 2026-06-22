import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 10; 

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  let product = null;

  try {
    await dbConnect();
    const productDoc = await Product.findById(id);
    if (!productDoc) {
      notFound();
    }
    product = productDoc.toJSON();
    if (product.createdAt) product.createdAt = product.createdAt.toISOString();
    if (product.updatedAt) product.updatedAt = product.updatedAt.toISOString();
  } catch (error) {
    console.error(`Failed to find product by id ${id}:`, error);
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
